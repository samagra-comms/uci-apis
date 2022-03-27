-- DropForeignKey
ALTER TABLE "UserSegment" DROP CONSTRAINT "UserSegment_allServiceID_fkey";

-- DropForeignKey
ALTER TABLE "UserSegment" DROP CONSTRAINT "UserSegment_byIDServiceID_fkey";

-- DropForeignKey
ALTER TABLE "UserSegment" DROP CONSTRAINT "UserSegment_byPhoneServiceID_fkey";

-- AlterTable
ALTER TABLE "UserSegment" ALTER COLUMN "allServiceID" DROP NOT NULL,
ALTER COLUMN "byPhoneServiceID" DROP NOT NULL,
ALTER COLUMN "byIDServiceID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_allServiceID_fkey" FOREIGN KEY ("allServiceID") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_byIDServiceID_fkey" FOREIGN KEY ("byIDServiceID") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_byPhoneServiceID_fkey" FOREIGN KEY ("byPhoneServiceID") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
