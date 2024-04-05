-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "inventory" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Hero" ("inventory", "name", "userId") SELECT "inventory", "name", "userId" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE UNIQUE INDEX "Hero_name_key" ON "Hero"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
