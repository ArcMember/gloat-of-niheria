-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CharacterCanon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "filter" TEXT,
    "href" TEXT,
    "src" TEXT,
    "author" TEXT,
    "age" TEXT,
    "nation" TEXT,
    "class" TEXT,
    "occupation" TEXT,
    "quests" TEXT
);
INSERT INTO "new_CharacterCanon" ("age", "author", "class", "filter", "href", "id", "name", "nation", "occupation", "quests", "src", "subtitle") SELECT "age", "author", "class", "filter", "href", "id", "name", "nation", "occupation", "quests", "src", "subtitle" FROM "CharacterCanon";
DROP TABLE "CharacterCanon";
ALTER TABLE "new_CharacterCanon" RENAME TO "CharacterCanon";
CREATE TABLE "new_CharacterHero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "filter" TEXT,
    "href" TEXT,
    "src" TEXT,
    "age" TEXT,
    "nation" TEXT,
    "class" TEXT,
    "player" TEXT,
    "occupation" TEXT,
    "quests" TEXT
);
INSERT INTO "new_CharacterHero" ("age", "class", "filter", "href", "id", "name", "nation", "occupation", "player", "quests", "src", "subtitle") SELECT "age", "class", "filter", "href", "id", "name", "nation", "occupation", "player", "quests", "src", "subtitle" FROM "CharacterHero";
DROP TABLE "CharacterHero";
ALTER TABLE "new_CharacterHero" RENAME TO "CharacterHero";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
