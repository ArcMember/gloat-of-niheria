/*
  Warnings:

  - You are about to drop the `AdDistributor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdRegistryEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AdDistributor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AdRegistryEntry";
PRAGMA foreign_keys=on;
