/*
  Warnings:

  - You are about to drop the column `transformerId` on the `ConversationLogic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationLogic" DROP CONSTRAINT "ConversationLogic_transformerId_fkey";

-- AlterTable
ALTER TABLE "ConversationLogic" DROP COLUMN "transformerId";
