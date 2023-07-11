/*
  Warnings:

  - You are about to drop the column `ownerID` on the `ConversationLogic` table. All the data in the column will be lost.
  - You are about to drop the column `ownerOrgID` on the `ConversationLogic` table. All the data in the column will be lost.
  - You are about to drop the column `ownerID` on the `UserSegment` table. All the data in the column will be lost.
  - You are about to drop the column `ownerOrgID` on the `UserSegment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ConversationLogic" DROP COLUMN "ownerID",
DROP COLUMN "ownerOrgID";

-- AlterTable
ALTER TABLE "UserSegment" DROP COLUMN "ownerID",
DROP COLUMN "ownerOrgID";
