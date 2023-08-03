import { BadRequestException, Controller, Get, Param, Post, Query, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { AddAdminHeaderInterceptor } from 'src/interceptors/addAdminHeader.interceptor';
import { AddROToResponseInterceptor } from 'src/interceptors/addROToResponse.interceptor';
import { AddResponseObjectInterceptor } from 'src/interceptors/addResponseObject.interceptor';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {

    constructor(
        private readonly monitoringService: MonitoringService
    ) {}

    @UseInterceptors(
        AddResponseObjectInterceptor,
        AddAdminHeaderInterceptor,
        AddROToResponseInterceptor,
    )
    @Get('/logs/:service')
    async getLogs(@Param('service') service: string, @Query() query) {
        if (!query.lines) {
            throw new BadRequestException('Number of lines required!');
        }
        if (!query.date) {
            throw new BadRequestException('Date is required!');
        }
        const dateRegex: RegExp = /^\d{2}_\d{2}_\d{4}$/;
        if (!dateRegex.test(query.date)) {
            throw new BadRequestException('Date format is invalid. Please provide date in dd_mm_yyyy format');
        }

        return await this.monitoringService.getLogs(service, query.lines, query.date);
    }

    @Get('/logs/:service/download/log')
    async downloadLogs(@Param('service') service: string, @Query() query): Promise<StreamableFile> {
        if (!query.date) {
            throw new BadRequestException('Date is required!');
        }
        const dateRegex: RegExp = /^\d{2}_\d{2}_\d{4}$/;
        if (!dateRegex.test(query.date)) {
            throw new BadRequestException('Date format is invalid. Please provide date in dd_mm_yyyy format');
        }

        return await this.monitoringService.downloadLogFile(service, query.date);
    }

    @Get('/logs/:service/download/error')
    async downloadErrorLogs(@Param('service') service: string, @Query() query): Promise<StreamableFile> {
        if (!query.date) {
            throw new BadRequestException('Date is required!');
        }
        const dateRegex: RegExp = /^\d{2}_\d{2}_\d{4}$/;
        if (!dateRegex.test(query.date)) {
            throw new BadRequestException('Date format is invalid. Please provide date in dd_mm_yyyy format');
        }

        return await this.monitoringService.downloadErrorFile(service, query.date);
    }

    @UseInterceptors(
        AddResponseObjectInterceptor,
        AddAdminHeaderInterceptor,
        AddROToResponseInterceptor,
    )
    @Post('/realtime/start')
    async startRealtimeAnalysis() {
        return await this.monitoringService.startRealtimeAnalysis();
    }

    @UseInterceptors(
        AddResponseObjectInterceptor,
        AddAdminHeaderInterceptor,
        AddROToResponseInterceptor,
    )
    @Post('/realtime/stop')
    async stopRealtimeAnalysis() {
        return await this.monitoringService.stopRealtimeAnalysis();
    }

    @UseInterceptors(
        AddResponseObjectInterceptor,
        AddAdminHeaderInterceptor,
        AddROToResponseInterceptor,
    )
    @Get('/realtime/available')
    async getAvailableRealtimeDataFiles() {
        return await this.monitoringService.getAvailableRealtimeDataFiles();
    }

    @UseInterceptors(
        AddResponseObjectInterceptor,
        AddAdminHeaderInterceptor,
        AddROToResponseInterceptor,
    )
    @Get('/realtime')
    async getRealtimeAnalysisData(@Query() query) {
        if (!query.date) {
            throw new BadRequestException('Date is required!');
        }
        const dateRegex: RegExp = /^\d{2}_\d{2}_\d{2}_\d{2}_\d{2}_\d{4}$/;
        if (!dateRegex.test(query.date)) {
            throw new BadRequestException('Date format is invalid. Please provide date in ss_mi_hh_dd_mm_yyyy format');
        }
        return await this.monitoringService.getRealtimeAnalysisData(query.date);
    }

    @UseInterceptors(
        AddResponseObjectInterceptor,
        AddAdminHeaderInterceptor,
        AddROToResponseInterceptor,
    )
    @Get('/overview')
    async getOverviewData(@Query() query) {
        if (!query.date) {
            throw new BadRequestException('Date is required!');
        }
        const dateRegex: RegExp = /^\d{2}_\d{2}_\d{2}_\d{2}_\d{2}_\d{4}$/;
        if (!dateRegex.test(query.date)) {
            throw new BadRequestException('Date format is invalid. Please provide date in ss_mi_hh_dd_mm_yyyy format');
        }
        return await this.monitoringService.getOverviewData(query.date);
    }
}
