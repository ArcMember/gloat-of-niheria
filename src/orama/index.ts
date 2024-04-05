import { type Orama, create, insert } from "@orama/orama";
import { PrismaClient } from '@prisma/client'

export type Page = { title: string; url: string; content: string; mtime: string; };

export let oramaDb: Orama;

export const createOramaDb = async () => {
  const prisma = new PrismaClient();
  const pages = await prisma.page.findMany({})

  if (oramaDb) {
    return;
  }
  const db = await create({
    language: 'russian',
    schema: {
      title: "string",
      url: "string",
      content: "string",
      mtime: "string",
      // image: "string",
    }
  });
  oramaDb = db;
  pages.map(async (page) => await insert(oramaDb, page));
};
