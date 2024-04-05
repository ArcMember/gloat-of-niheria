-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdDistributor" (
    "name" TEXT NOT NULL DEFAULT '',
    "id" TEXT NOT NULL,
    "lastSendTime" DATETIME NOT NULL
);
INSERT INTO "new_AdDistributor" ("id", "lastSendTime") SELECT "id", "lastSendTime" FROM "AdDistributor";
DROP TABLE "AdDistributor";
ALTER TABLE "new_AdDistributor" RENAME TO "AdDistributor";
CREATE UNIQUE INDEX "AdDistributor_id_key" ON "AdDistributor"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
