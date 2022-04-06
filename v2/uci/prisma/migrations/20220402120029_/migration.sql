/*
  Warnings:

  - You are about to drop the column `name` on the `Adapter` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Adapter_name_key";

-- AlterTable
ALTER TABLE "Adapter" DROP COLUMN "name";
