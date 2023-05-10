import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient(); // Prisma client instance

/**
 * Seed the database with admin user
 */
async function main() {
  const hashedPassword = await argon2.hash(
    process.env.ADMIN_PASSWORD as string
  );

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "Admin User",
      username: "admin",
      password: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
