import downloadData from './utils/downloadData';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../global-services/prisma.service';
import { ConfigService } from '@nestjs/config';

import * as servciesData from './data/getServicesQuery.json';
import * as transformerData from './data/getTransformerQuery.json';
import * as adapterData from './data/getAdapterQuery.json';
import * as userSegmentData from './data/getUserSegmentQuery.json';
import * as conversationLogicData from './data/getCLQuery.json';
import * as botData from './data/getBotQuery.json';

import {
  insertAdapterData,
  insertBotData,
  insertConversationLogicData,
  insertServicesData,
  insertTransformerData,
  insertUserSegmentData,
} from './utils/insertData';

@Injectable()
export class MigrationService {
  tableData: any[];
  tableColumns: any;
  hasuraURL: string;
  hasuraSecret: string;
  filePath = './migration/data';

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.hasuraURL = this.configService.get<string>('GRAPHQL_BASE_URL');
    this.hasuraSecret = this.configService.get<string>(
      'HASURA_GRAPHQL_ADMIN_SECRET',
    );
    this.tableData = [];
    this.tableColumns = ['Service Name', 'Total', 'Inserted'];
  }

  async downloadData() {
    const response = downloadData(
      this.hasuraURL,
      this.hasuraSecret,
      this.filePath,
    );
    if (response) {
      console.log('Success');
    }
  }

  async deleteAllData() {
    await this.prisma.bot.deleteMany({});
    await this.prisma.conversationLogic.deleteMany({});
    await this.prisma.userSegment.deleteMany({});
    await this.prisma.adapter.deleteMany({});
    await this.prisma.transformerConfig.deleteMany({});
    await this.prisma.transformer.deleteMany({});
    await this.prisma.service.deleteMany({});
  }

  async insertData() {
    await this.deleteAllData();
    const insertServicesSummary = await insertServicesData(
      this.prisma,
      servciesData,
    );
    this.tableData.push(insertServicesSummary);
    const insertTransformerSummary = await insertTransformerData(
      this.prisma,
      transformerData,
    );
    this.tableData.push(insertTransformerSummary);

    const insertAdapterSummary = await insertAdapterData(
      this.prisma,
      adapterData,
    );
    this.tableData.push(insertAdapterSummary);

    const insertUserSegmentSummary = await insertUserSegmentData(
      this.prisma,
      userSegmentData,
    );
    this.tableData.push(insertUserSegmentSummary);

    const insertConversationLogicSummary = await insertConversationLogicData(
      this.prisma,
      conversationLogicData,
    );
    this.tableData.push(insertConversationLogicSummary);

    const insertBotSummary = await insertBotData(this.prisma, botData);
    this.tableData.push(insertBotSummary);
    console.table(this.tableData);
  }
}
