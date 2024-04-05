-- CreateTable
CREATE TABLE "AdRegistryEntry" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "AdRegistryEntry_id_key" ON "AdRegistryEntry"("id");
