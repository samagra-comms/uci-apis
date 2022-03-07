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
const prisma_service_1 = require("./services/prisma.service");
const adapters_module_1 = require("./adapters/adapters.module");
const bot_module_1 = require("./bot/bot.module");
const user_segment_module_1 = require("./user-segment/user-segment.module");
const conversation_logic_module_1 = require("./conversation-logic/conversation-logic.module");
const request_interceptor_1 = require("./interceptors/request.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }), adapters_module_1.AdaptersModule, bot_module_1.BotModule, user_segment_module_1.UserSegmentModule, conversation_logic_module_1.ConversationLogicModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, request_interceptor_1.RequestInterceptor],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map