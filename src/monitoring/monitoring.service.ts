import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stats, createReadStream } from 'node:fs';
import { FileHandle, open, opendir, readFile, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class MonitoringService {

    private readonly logger: Logger;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.logger = new Logger(MonitoringService.name);
    }

    async readNBytes(file: FileHandle, position: number, bytes: number): Promise<string> {
        const buffer: Buffer = Buffer.alloc(bytes);
        await file.read(buffer, 0, bytes, position);
        const content: string = buffer.toString();
        return content;
    }

    async readLastNLines(file: FileHandle, lines: number): Promise<string> {
        let linesRemaining = lines, resultString = '';
        const stats: Stats =  await file.stat();
        const fileSize: number = stats.size;
        const BUFFER_SIZE: number = 8192;
        let lastReadPosition: number = fileSize;
        while (linesRemaining > 0 && lastReadPosition > 0) {
            const position: number = Math.max(lastReadPosition - BUFFER_SIZE, 0);
            let content: string = await this.readNBytes(file, position, position == 0 ? lastReadPosition : BUFFER_SIZE);
            let newlinePositions: number[] = [];
            for (let i: number = 0; i < content.length; i++) {
                if (content.charAt(i) == '\n') {
                    newlinePositions.push(i);
                }
            }
            if (newlinePositions.length == 0) {
                break;
            }
            if (linesRemaining < newlinePositions.length) {
                content = content.substring(newlinePositions[newlinePositions.length - linesRemaining - 1] + 1);
            }
            linesRemaining -= newlinePositions.length;
            resultString = content + resultString;
            lastReadPosition = position;
        }

        return resultString;
    }

    async getLogs(service: string, lines: number, date: string) {
        const startTime = performance.now();
        this.logger.log(`Trying to retrieve ${lines} lines log for service: ${service}, date: ${date}.`);
        const logFilename: string = `${this.configService.get<string>('LOGS_FOLDER')}/${service}_log_${date}.log`;
        const errorLogFilename: string = `${this.configService.get<string>('LOGS_FOLDER')}/${service}_error_${date}.log`;
        const logFileProcess = stat(logFilename)
        .then(async () => {
            const logFile: FileHandle = await open(logFilename, 'r');
            const logFileContent: string = await this.readLastNLines(logFile, lines);
            logFile.close();
            return logFileContent;
        })
        .catch(async () => {
            this.logger.warn("Tried to retrieve logs from non-existent file!");
            return '';
        });
        const errorFileProcess = stat(errorLogFilename)
        .then(async () => {
            const errorFile: FileHandle = await open(errorLogFilename, 'r');
            const errorFileContent: string = await this.readLastNLines(errorFile, lines);
            errorFile.close();
            return errorFileContent;
        })
        .catch(async () => {
            this.logger.warn("Tried to retrieve logs from non-existent file!");
            return '';
        });

        return Promise.allSettled([logFileProcess, errorFileProcess])
        .then((results) => {
            this.logger.log(`Returning logs in ${performance.now() - startTime} milliseconds.`);
            return {
                "logs": results[0].status === 'fulfilled' ? results[0].value : '',
                "error": results[1].status === 'fulfilled' ? results[1].value : '',
            };
        })
        .catch((err) => {
            this.logger.error("Failed to read log files!");
            throw err;
        });
    }

    async downloadLogFile(service: string, date: string): Promise<StreamableFile> {
        this.logger.log(`Trying to retrieve log file for service: ${service}, date: ${date}.`);
        const logFilename: string = `${this.configService.get<string>('LOGS_FOLDER')}/${service}_log_${date}.log`;
        return await stat(logFilename)
        .then(async () => {
            const logFile = createReadStream(join(process.cwd(), logFilename));
            return new StreamableFile(logFile);
        })
        .catch(async () => {
            this.logger.warn(`Tried to retrieve log file for non-existent file ${logFilename}!`);
            throw new NotFoundException(`Log file for service '${service}' and date '${date}' not found!`);
        });
    }

    async downloadErrorFile(service: string, date: string): Promise<StreamableFile> {
        this.logger.log(`Trying to retrieve error logs file for service: ${service}, date: ${date}.`);
        const logFilename: string = `${this.configService.get<string>('LOGS_FOLDER')}/${service}_error_${date}.log`;
        return await stat(logFilename)
        .then(async () => {
            const logFile = createReadStream(join(process.cwd(), logFilename));
            return new StreamableFile(logFile);
        })
        .catch(async () => {
            this.logger.warn(`Tried to retrieve error logs file for non-existent file ${logFilename}!`);
            throw new NotFoundException(`Error logs file for service '${service}' and date '${date}' not found!`);
        });
    }

    async startRealtimeAnalysis() {
        const triggerFile = this.configService.get<string>('ANALYSIS_TRIGGGER_FILE');
        const logsFolder = this.configService.get<string>('LOGS_FOLDER');
        const triggerFileLocation = `${logsFolder}/${triggerFile}`;
        await stat(triggerFileLocation)
        // Trigger file already exists
        .then(() => {
           this.logger.error(`Trying to trigger analysis for ${Date()}, but trigger file already exists!`);
           throw new ConflictException('Analysis is already running!');
        })
        // Trigger file does not exist
        .catch((err) => {
            if (err instanceof ConflictException) {
                throw err;
            }
        });
        // Creating trigger file
        return await open(triggerFileLocation, 'w')
        .then((file) => {
            this.logger.log(`Started realtime analysis at ${Date()}.`);
            file.close();
            return true;
        })
        .catch((err) => {
            this.logger.log(`Error creating trigger file, Reason: ${err}`);
            throw new InternalServerErrorException('Realtime analysis could not be triggered!');
        });
    }

    async stopRealtimeAnalysis() {
        const triggerFile = this.configService.get<string>('ANALYSIS_TRIGGGER_FILE');
        const logsFolder = this.configService.get<string>('LOGS_FOLDER');
        const triggerFileLocation = `${logsFolder}/${triggerFile}`;
        await unlink(triggerFileLocation)
        .then(() => {
            this.logger.log(`Realtime analysis stopped at ${Date()}`);
        })
        .catch((err) => {
            this.logger.error(`Error in deleting trigger file, Reason: ${err}`);
            throw new InternalServerErrorException('Realtime analysis could not be stopped!');
        });
        return true;
    }

    async getRealtimeAnalysisData(date: string) {
        this.logger.log(`Trying to read analysis file for date ${date}.`);
        const logsFolder = this.configService.get<string>('LOGS_FOLDER');
        const analysisFile = `${logsFolder}/analysis_${date}.log`;
        await stat(analysisFile)
        .catch((err) => {
            this.logger.error(`Analysis file corresponding to time ${date} is not found. Reason ${err}`);
            throw new NotFoundException(`Analysis file corresponding to time ${date} is not found!`);
        });
        return (await readFile(analysisFile)).toString();
    }

    async getAvailableRealtimeDataFiles() {
        this.logger.log(`Tring to fetch realtime analysis data files.`);
        const logsFolderPath = this.configService.get<string>('LOGS_FOLDER');
        const logsFolder = await opendir(`${logsFolderPath}`);
        const analysis_files: string[] = [];
        let file = await logsFolder.read();
        while (file) {
            if (file.isFile() && file.name.startsWith('analysis')) {
                // get only ss_mi_hh_dd_mm_yyyy
                analysis_files.push(file.name.substring(9, 25));
            }
            file = await logsFolder.read();
        }
        this.logger.log(`Found ${analysis_files.length} analysis files. [${analysis_files}]`);
        return analysis_files;
    }

    async getOverviewData(date: string) {
        this.logger.log(`Trying to read analysis file for date ${date}.`);
        const logsFolder = this.configService.get<string>('LOGS_FOLDER');
        const overviewFile = `${logsFolder}/overview_${date}.log`;
        await stat(overviewFile)
        .catch((err) => {
            this.logger.error(`Overview file corresponding to time ${date} is not found. Reason ${err}`);
            throw new NotFoundException(`Overview file corresponding to time ${date} is not found!`);
        });
        return (await readFile(overviewFile)).toString();
    }
}
