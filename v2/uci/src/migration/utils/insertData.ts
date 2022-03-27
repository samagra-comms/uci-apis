// insert servicesData to Service table
export async function insertServicesData(prisma, servciesData): Promise<any> {
  for (const service of servciesData.data.service) {
    try {
      service['updatedAt'] = service.updated_at;
      service['createdAt'] = service.created_at;
      delete service.updated_at;
      delete service.created_at;
      await prisma.service.create({ data: service });
    } catch (e) {
      console.log('Data already Inserted or error in Service', e);
    }
  }

  return {
    ServiceName: 'Service',
    Rows: servciesData.data.service.length,
    Inserted: await prisma.service.count(),
  };
}

export async function insertTransformerData(
  prisma,
  transformerData,
): Promise<any> {
  for (const transformer of transformerData.data.transformer) {
    try {
      await prisma.transformer.create({
        data: {
          createdAt: transformer.created_at,
          updatedAt: transformer.updated_at,
          config: transformer.config,
          id: transformer.id,
          name: transformer.name,
          tags: transformer.tags,
          service: { connect: { id: transformer.service_id } },
        },
      });
    } catch (e) {
      console.log('Data already Inserted or error in Transformer', transformer);
    }
  }

  return {
    ServiceName: 'Transformers',
    Rows: transformerData.data.transformer.length,
    Inserted: await prisma.transformer.count(),
  };
}

export async function insertAdapterData(prisma, adapterData): Promise<any> {
  for (const adapter of adapterData.data.adapter) {
    try {
      await prisma.adapter.create({
        data: {
          createdAt: adapter.created_at,
          updatedAt: adapter.updated_at,
          config: adapter.config,
          channel: adapter.channel,
          provider: adapter.provider,
          id: adapter.id,
          name: adapter.name,
        },
      });
    } catch (e) {
      console.log('Data already Inserted or error in Adapter', e);
    }
  }
  return {
    ServiceName: 'Adapters',
    Rows: adapterData.data.adapter.length,
    Inserted: await prisma.adapter.count(),
  };
}

export async function insertUserSegmentData(
  prisma,
  userSegmentData,
): Promise<any> {
  for (const userSegment of userSegmentData.data.userSegment) {
    try {
      await prisma.userSegment.create({
        data: {
          id: userSegment.id,
          createdAt: userSegment.created_at,
          name: userSegment.name,
          description: userSegment.description,
          category: userSegment.category,
          all: {
            connect: {
              id: userSegment.all,
            },
          },
          byID: {
            connect: {
              id: userSegment.byID,
            },
          },
          byPhone: {
            connect: {
              id: userSegment.byPhone,
            },
          },
        },
      });
    } catch (e) {
      console.log('Data already Inserted or error in userSegmentData', e);
    }
  }
  return {
    ServiceName: 'UserSegment',
    Rows: userSegmentData.data.userSegment.length,
    Inserted: await prisma.userSegment.count(),
  };
}

export async function insertConversationLogicData(
  prisma,
  conversationLogicData,
): Promise<any> {
  for (const conversationLogic of conversationLogicData.data
    .conversationLogic) {
    const transformers = conversationLogic.transformers.map((transformer) => ({
      transformerId: transformer.id,
      meta: transformer.meta,
    }));
    try {
      await prisma.conversationLogic.create({
        data: {
          id: conversationLogic.id,
          name: conversationLogic.name,
          createdAt: conversationLogic.created_at,
          updatedAt: conversationLogic.updated_at,
          description: conversationLogic.description,
          transformers: {
            createMany: {
              data: transformers,
            },
          },
          adapter: {
            connect: {
              id: conversationLogic.adapter,
            },
          },
        },
      });
    } catch (e) {
      console.log('Data already Inserted or error in conversationLogic', e);
    }
  }
  return {
    ServiceName: 'ConversationLogic',
    Rows: conversationLogicData.data.conversationLogic.length,
    Inserted: await prisma.conversationLogic.count(),
  };
}

export async function insertBotData(prisma, botData): Promise<any> {
  for (const bot of botData.data.bot) {
    const data = {
      id: bot.id,
      name: bot.name,
      createdAt: bot.created_at,
      updatedAt: bot.updated_at,
      startingMessage: bot.startingMessage,
      users: {
        connect: ([] = bot.users.map((user) => ({
          id: user,
        }))),
      },
      startDate: bot.startDate === null ? null : new Date(bot.startDate),
      endDate: bot.startDate === null ? null : new Date(bot.endDate),
      description: bot.description,
      logicIDs: {
        connect: ([] = bot.logicIDs.map((logicID) => ({
          id: logicID,
        }))),
      },
      ownerID: bot.ownerID,
      ownerOrgID: bot.ownerOrgID,
      purpose: bot.purpose,
    };
    try {
      await prisma.bot.create({
        data,
      });
    } catch (e) {
      console.log('Data already Inserted or error in bot', e);
      console.log(JSON.stringify(data));
    }
  }
  return {
    ServiceName: 'Bot',
    Rows: botData.data.bot.length,
    Inserted: await prisma.bot.count(),
  };
}
