/*
  Warnings:

  - You are about to drop the column `botId` on the `ConversationLogic` table. All the data in the column will be lost.
  - You are about to drop the column `conversationLogicId` on the `Transformer` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationLogic" DROP CONSTRAINT "ConversationLogic_botId_fkey";

-- DropForeignKey
ALTER TABLE "Transformer" DROP CONSTRAINT "Transformer_conversationLogicId_fkey";

-- DropForeignKey
ALTER TABLE "UserSegment" DROP CONSTRAINT "UserSegment_botId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- AlterTable
ALTER TABLE "ConversationLogic" DROP COLUMN "botId";

-- AlterTable
ALTER TABLE "Transformer" DROP COLUMN "conversationLogicId";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "_CategoryToPost";

-- CreateTable
CREATE TABLE "_ConversationLogicToTransformer" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BotToUserSegment" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BotToConversationLogic" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationLogicToTransformer_AB_unique" ON "_ConversationLogicToTransformer"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationLogicToTransformer_B_index" ON "_ConversationLogicToTransformer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BotToUserSegment_AB_unique" ON "_BotToUserSegment"("A", "B");

-- CreateIndex
CREATE INDEX "_BotToUserSegment_B_index" ON "_BotToUserSegment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BotToConversationLogic_AB_unique" ON "_BotToConversationLogic"("A", "B");

-- CreateIndex
CREATE INDEX "_BotToConversationLogic_B_index" ON "_BotToConversationLogic"("B");

-- AddForeignKey
ALTER TABLE "_ConversationLogicToTransformer" ADD FOREIGN KEY ("A") REFERENCES "ConversationLogic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationLogicToTransformer" ADD FOREIGN KEY ("B") REFERENCES "Transformer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BotToUserSegment" ADD FOREIGN KEY ("A") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BotToUserSegment" ADD FOREIGN KEY ("B") REFERENCES "UserSegment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BotToConversationLogic" ADD FOREIGN KEY ("A") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BotToConversationLogic" ADD FOREIGN KEY ("B") REFERENCES "ConversationLogic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
