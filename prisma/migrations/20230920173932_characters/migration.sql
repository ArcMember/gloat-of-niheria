-- CreateTable
CREATE TABLE "CharacterCanon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "author" TEXT,
    "age" TEXT,
    "nation" TEXT,
    "class" TEXT,
    "occupation" TEXT,
    "quests" TEXT
);

-- CreateTable
CREATE TABLE "CharacterHero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "age" TEXT,
    "nation" TEXT,
    "class" TEXT,
    "player" TEXT,
    "occupation" TEXT,
    "quests" TEXT
);

-- CreateTable
CREATE TABLE "FactionRelation" (
    "heroId" INTEGER NOT NULL,
    "RT" TEXT NOT NULL,
    "TY" TEXT NOT NULL,
    "AF" TEXT NOT NULL,
    "LT" TEXT NOT NULL,
    "KF" TEXT NOT NULL,
    "MW" TEXT NOT NULL,
    "FL" TEXT NOT NULL,
    "SX" TEXT NOT NULL,
    "SK" TEXT NOT NULL,
    "KL" TEXT NOT NULL,
    "HL" TEXT NOT NULL,
    CONSTRAINT "FactionRelation_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "CharacterHero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FactionRelation_heroId_key" ON "FactionRelation"("heroId");
