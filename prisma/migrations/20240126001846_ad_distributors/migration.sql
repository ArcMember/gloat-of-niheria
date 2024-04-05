-- CreateTable
CREATE TABLE "AdDistributor" (
    "id" TEXT NOT NULL,
    "lastSendTime" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdDistributor_id_key" ON "AdDistributor"("id");
