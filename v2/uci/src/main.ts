import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from './services/prisma.service';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  app.enableCors();
  app.setGlobalPrefix('admin');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const config = new DocumentBuilder()
  .setTitle('UCI')
  .setDescription('UCI API description')
  .setVersion('1.0')
  .build();
  const customOptions: SwaggerCustomOptions = {
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
