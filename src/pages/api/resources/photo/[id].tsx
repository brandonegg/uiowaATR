import { type NextApiHandler } from "next";
import formidable from "formidable";
import * as fs from "fs";
import { prisma } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { Role } from "@prisma/client";

/**
 * Returns filename for a given filepath.
 * @param filepath
 */
function getFileName(filepath: string) {
  return filepath.split("/").at(-1) ?? "";
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  const authSession = await getServerAuthSession({ req, res });
  if (!authSession?.user || authSession.user.role !== Role.ADMIN) {
    res.writeHead(401, "Not authorized");
    return;
  }

  const { id } = req.query;

  if (Array.isArray(id) || !id) {
    res.writeHead(400, "Invalid resource ID provided").end();
    return;
  }

  const form = formidable({
    uploadDir: "./public/resource_logos/uploads",
    keepExtensions: true,
  });

  const uploadPhoto: Promise<formidable.File> = new Promise(
    (resolve, reject) => {
      form.parse(req, (_err, _fields, files) => {
        const photo = Array.isArray(files.photo) ? files.photo[0] : files.photo;
        if (!photo) {
          reject("Invalid file type sent (or none provided)");
          return;
        }

        resolve(photo);
      });
    }
  );

  const photoBuffer = fs.readFileSync((await uploadPhoto).filepath);

  try {
    await prisma.auditoryResource.update({
      where: {
        id,
      },
      data: {
        photo: {
          name: getFileName((await uploadPhoto).filepath),
          data: photoBuffer,
        },
      },
    });
  } catch (error: unknown) {
    res.writeHead(400, JSON.stringify((error as Error).message)).end();
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" }).end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
