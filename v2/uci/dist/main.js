"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const prisma_service_1 = require("./global-services/prisma.service");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const configService = app.get(config_1.ConfigService);
    const brokers = [configService.get('KAFKA_HOST_DEV')];
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.KAFKA,
        name: 'SUNBIRD_TELEMETRY',
        options: {
            client: {
                brokers: brokers,
            },
            consumer: {
                groupId: 'uci-api',
            },
        },
    });
    const prismaService = app.get(prisma_service_1.PrismaService);
    prismaService.enableShutdownHooks(app);
    app.setGlobalPrefix('admin');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('UCI')
        .setDescription('UCI API description')
        .setVersion('1.0')
        .build();
    const customOptions = {
        uiConfig: {
            docExpansion: null,
        },
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, customOptions);
    await app.listen(3001, '0.0.0.0');
    console.log(`App Listening to ${3001}`);
}
bootstrap();
//# sourceMappingURL=main.js.map