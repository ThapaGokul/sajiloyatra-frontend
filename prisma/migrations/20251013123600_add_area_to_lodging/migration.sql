/*
  Warnings:

  - Added the required column `area` to the `Lodging` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lodging" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "area" TEXT NOT NULL
);
INSERT INTO "new_Lodging" ("description", "id", "imageUrl", "name") SELECT "description", "id", "imageUrl", "name" FROM "Lodging";
DROP TABLE "Lodging";
ALTER TABLE "new_Lodging" RENAME TO "Lodging";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
