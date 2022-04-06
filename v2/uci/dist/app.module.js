"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./global-services/prisma.service");
const adapter_module_1 = require("./modules/adapter/adapter.module");
const bot_module_1 = require("./modules/bot/bot.module");
const user_segment_module_1 = require("./modules/user-segment/user-segment.module");
const conversation_logic_module_1 = require("./modules/conversation-logic/conversation-logic.module");
const migration_module_1 = require("./migration/migration.module");
const migration_service_1 = require("./migration/migration.service");
const secrets_module_1 = require("./modules/secrets/secrets.module");
const commonService_module_1 = require("./global-services/commonService.module");
const sunbird_telemetry_module_1 = require("./sunbird-telemetry/sunbird-telemetry.module");
const service_module_1 = require("./modules/service/service.module");
const transformer_module_1 = require("./modules/transformer/transformer.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            adapter_module_1.AdaptersModule,
            bot_module_1.BotModule,
            migration_module_1.MigrationModule,
            user_segment_module_1.UserSegmentModule,
            conversation_logic_module_1.ConversationLogicModule,
            secrets_module_1.SecretsModule,
            commonService_module_1.CommonServiceModule,
            sunbird_telemetry_module_1.SunbirdTelemetryModule,
            service_module_1.ServiceModule,
            transformer_module_1.TransformerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, migration_service_1.MigrationService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map