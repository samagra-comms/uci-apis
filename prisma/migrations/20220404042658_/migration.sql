/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Adapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Adapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adapter" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Adapter_name_key" ON "Adapter"("name");
