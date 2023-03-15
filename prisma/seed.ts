import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.auditoryResource.createMany({
    data: [
      {
        icon: "https://example.com/icon1.png",
        name: "Auditory Resource 1",
        description: "This is the first auditory resource",
        manufacturer: "Manufacturer A",
        platform: "APP_IOS",
        ages: { min: 5, max: 10 },
        skills: ["PHONEMES", "WORDS"],
        skill_level: "BEGINNER",
        cost: 10.99,
      },
      {
        icon: "https://example.com/icon2.png",
        name: "Auditory Resource 2",
        description: "This is the second auditory resource",
        manufacturer: "Manufacturer B",
        platform: "WEBSITE",
        ages: { min: 8, max: 12 },
        skills: ["WORDS", "SENTENCES"],
        skill_level: "INTERMEDIATE",
        cost: 15.99,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
