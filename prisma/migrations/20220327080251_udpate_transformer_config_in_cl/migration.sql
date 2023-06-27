/*
  Warnings:

  - You are about to drop the `_ConversationLogicToTransformer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ConversationLogicToTransformer" DROP CONSTRAINT "_ConversationLogicToTransformer_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationLogicToTransformer" DROP CONSTRAINT "_ConversationLogicToTransformer_B_fkey";

-- AlterTable
ALTER TABLE "ConversationLogic" ADD COLUMN     "transformerId" UUID;

-- DropTable
DROP TABLE "_ConversationLogicToTransformer";

-- CreateTable
CREATE TABLE "TransformerConfig" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transformerId" UUID NOT NULL,
    "meta" JSONB NOT NULL,
    "conversationLogicId" UUID,

    CONSTRAINT "TransformerConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransformerConfig_transformerId_key" ON "TransformerConfig"("transformerId");

-- AddForeignKey
ALTER TABLE "TransformerConfig" ADD CONSTRAINT "TransformerConfig_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "Transformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransformerConfig" ADD CONSTRAINT "TransformerConfig_conversationLogicId_fkey" FOREIGN KEY ("conversationLogicId") REFERENCES "ConversationLogic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationLogic" ADD CONSTRAINT "ConversationLogic_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "Transformer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
