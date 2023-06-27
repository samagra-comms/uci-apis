-- CreateEnum
CREATE TYPE "BotStatus" AS ENUM ('ENABLED', 'DISABLED', 'DRAFT');

-- DropIndex
DROP INDEX "Adapter_name_key";

-- AlterTable
ALTER TABLE "Adapter" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "status" "BotStatus" NOT NULL DEFAULT E'DRAFT';
