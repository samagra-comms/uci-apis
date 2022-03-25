"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const prisma_service_1 = require("./services/prisma.service");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const prismaService = app.get(prisma_service_1.PrismaService);
    prismaService.enableShutdownHooks(app);
    app.setGlobalPrefix('admin');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
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
    await app.listen(process.env.port);
    console.log(`App Listening to ${3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map