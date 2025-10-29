-- CreateTable
CREATE TABLE "LocalGuide" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "LocalGuide_pkey" PRIMARY KEY ("id")
);
