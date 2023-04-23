/*
  Warnings:

  - Changed the type of `firstReleaseDate` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "firstReleaseDate",
ADD COLUMN     "firstReleaseDate" INTEGER NOT NULL;
