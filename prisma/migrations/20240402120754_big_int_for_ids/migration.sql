/*
  Warnings:

  - You are about to alter the column `userId` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "userId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "inventory" TEXT NOT NULL DEFAULT '',
    "invLog" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Hero" ("invLog", "inventory", "name", "userId") SELECT "invLog", "inventory", "name", "userId" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
