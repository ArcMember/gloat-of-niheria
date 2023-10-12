/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "MagicRune" (
    "name" TEXT NOT NULL,
    "baseName" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "advancedDescription" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "MagicRune_name_key" ON "MagicRune"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MagicRune_baseName_key" ON "MagicRune"("baseName");
