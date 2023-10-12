/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CharacterCanon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CharacterHero` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CharacterCanon_name_key" ON "CharacterCanon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterHero_name_key" ON "CharacterHero"("name");
