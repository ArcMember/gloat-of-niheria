-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdRegistryEntry" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL DEFAULT '',
    "tags" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_AdRegistryEntry" ("date", "id", "message") SELECT "date", "id", "message" FROM "AdRegistryEntry";
DROP TABLE "AdRegistryEntry";
ALTER TABLE "new_AdRegistryEntry" RENAME TO "AdRegistryEntry";
CREATE UNIQUE INDEX "AdRegistryEntry_id_key" ON "AdRegistryEntry"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
