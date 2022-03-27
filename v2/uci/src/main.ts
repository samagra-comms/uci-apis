import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from './services/prisma.service';
import {
  DocumentBuilder,
  FastifySwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  /** Fastify Application */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  /** Register Prismaservice LifeCycle hooks */
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  /** Global prefix: Will result in appending of keyword 'admin' at the start of all the request */
  app.setGlobalPrefix('admin');

  /** Enable global versioning of all the API's, default version will be v1 */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());

  /** OpenApi spec Document builder for Swagger Api Explorer  */
  const config = new DocumentBuilder()
    .setTitle('UCI')
    .setDescription('UCI API description')
    .setVersion('1.0')
    .build();
  const customOptions: FastifySwaggerCustomOptions = {
    uiConfig: {
      docExpansion: null,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(process.env.port);
  console.log(`App Listening to ${3000}`);
}
bootstrap();
