-- CreateTable
CREATE TABLE "Adapter" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channel" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Adapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB,
    "name" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transformer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "config" JSONB NOT NULL,
    "serviceId" UUID NOT NULL,
    "conversationLogicId" UUID,

    CONSTRAINT "Transformer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bot" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "startingMessage" TEXT NOT NULL,
    "ownerID" TEXT NOT NULL,
    "ownerOrgID" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSegment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "ownerID" TEXT NOT NULL,
    "ownerOrgID" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "allServiceID" UUID NOT NULL,
    "byPhoneServiceID" UUID NOT NULL,
    "byIDServiceID" UUID NOT NULL,
    "botId" UUID,

    CONSTRAINT "UserSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationLogic" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "ownerID" TEXT,
    "ownerOrgID" TEXT,
    "adapterId" UUID NOT NULL,
    "botId" UUID,

    CONSTRAINT "ConversationLogic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adapter_name_key" ON "Adapter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Transformer_serviceId_key" ON "Transformer"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Bot_name_key" ON "Bot"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSegment_name_key" ON "UserSegment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSegment_allServiceID_key" ON "UserSegment"("allServiceID");

-- CreateIndex
CREATE UNIQUE INDEX "UserSegment_byPhoneServiceID_key" ON "UserSegment"("byPhoneServiceID");

-- CreateIndex
CREATE UNIQUE INDEX "UserSegment_byIDServiceID_key" ON "UserSegment"("byIDServiceID");

-- AddForeignKey
ALTER TABLE "Transformer" ADD CONSTRAINT "Transformer_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformer" ADD CONSTRAINT "Transformer_conversationLogicId_fkey" FOREIGN KEY ("conversationLogicId") REFERENCES "ConversationLogic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_allServiceID_fkey" FOREIGN KEY ("allServiceID") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_byIDServiceID_fkey" FOREIGN KEY ("byIDServiceID") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_byPhoneServiceID_fkey" FOREIGN KEY ("byPhoneServiceID") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegment" ADD CONSTRAINT "UserSegment_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationLogic" ADD CONSTRAINT "ConversationLogic_adapterId_fkey" FOREIGN KEY ("adapterId") REFERENCES "Adapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationLogic" ADD CONSTRAINT "ConversationLogic_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
