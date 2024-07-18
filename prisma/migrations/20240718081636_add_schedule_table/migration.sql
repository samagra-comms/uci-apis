-- CreateTable
CREATE TABLE "Schedules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "authToken" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedules_botId_key" ON "Schedules"("botId");
