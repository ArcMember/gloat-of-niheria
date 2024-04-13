import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();
export const heroes = prismaClient.hero.findMany({})