-- CreateTable
CREATE TABLE "GalleryImage" (
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryImage_url_key" ON "GalleryImage"("url");
