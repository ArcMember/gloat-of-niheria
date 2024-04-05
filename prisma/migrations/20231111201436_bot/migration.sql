/*
  Warnings:

  - You are about to drop the `CharacterCanon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharacterHero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FactionRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CharacterCanon";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CharacterHero";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FactionRelation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Hero" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "inventory" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
