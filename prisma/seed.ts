import { type Platform, PrismaClient, type RangeInput, type Skill, type PaymentType, type SkillLevel, type Prisma } from "@prisma/client";
import * as path from 'path';
import fs from "fs";
import readline from "readline";

const filePath = path.resolve(__dirname, '../data/at_resources.csv');
const prisma = new PrismaClient();

const readCSVData = async (path: string): Promise<Prisma.AuditoryResourceCreateInput[]> => {
  const stream = fs.createReadStream(path);
  const reader = readline.createInterface({ input: stream });

  return await new Promise((resolve, _reject) => {
    const auditoryResources: Prisma.AuditoryResourceCreateInput[] = [];
    
    reader.on("line", row => {
      const rowCells = row.split(",");

      if (rowCells[0] === "Name") {
        //skip first row
        return;
      }
  
      const platforms: Platform[] = (rowCells[2]?.split(";") ?? []) as Platform[];
      const skills: Skill[] = (rowCells[4]?.split(";") ?? []) as Skill[];
      const skill_levels: SkillLevel[] = (rowCells[5]?.split(";") ?? []) as SkillLevel[];
      const payment_options: PaymentType[] = (rowCells[7]?.split(";") ?? []) as PaymentType[];
  
      const splitAgeString = rowCells[3]?.split('-') ?? ['0', '10'];
      const ages: RangeInput = {
        min: parseInt(splitAgeString[0] ?? '0'),
        max: parseInt(splitAgeString[1] ?? '10'),
      }
  
      const data: Prisma.AuditoryResourceCreateInput = {
        name: rowCells[0] ?? 'n/a',
        icon: rowCells[1] ?? '',
        description: rowCells[9] ?? 'n/a',
        download_link: rowCells[8] ?? '',
        manufacturer: rowCells[6] ?? 'n/a',
        platforms,
        ages,
        skills,
        skill_levels,
        payment_options
      }
      
      auditoryResources.push(data);
    });
  
    reader.on("close", () => {
      //  Reached the end of file
      resolve(auditoryResources)
      console.log("Loading CSV completed!");
    });
  });
}

async function main() {
  const resources = await readCSVData(filePath);

  console.log(resources);

  for (const resource of resources) {
    console.log(resource)
    await prisma.auditoryResource.create({
      data: resource,
    });
  }
}

/*
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
*/

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
