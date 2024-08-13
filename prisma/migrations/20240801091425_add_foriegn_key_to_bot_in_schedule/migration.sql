/*
  Warnings:

  - Changed the type of `botId` on the `Schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schedules" DROP COLUMN "botId",
ADD COLUMN     "botId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
