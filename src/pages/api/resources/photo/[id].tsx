import { type NextApiHandler } from "next";
import formidable from "formidable";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  const { id } = req.query;
  console.log(id);

  const form = formidable({
    uploadDir: "./public/resource_logos/uploads",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    console.log(JSON.stringify(files));
  });

  res.writeHead(200, { "Content-Type": "application/json" }).end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
