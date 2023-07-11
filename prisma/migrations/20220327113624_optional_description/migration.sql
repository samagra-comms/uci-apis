/*
  Warnings:

  - Made the column `description` on table `UserSegment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bot" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserSegment" ALTER COLUMN "description" SET NOT NULL;
