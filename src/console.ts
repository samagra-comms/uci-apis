import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MigrationService } from './migration/migration.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const command = process.argv[2];
  console.log({ command });

  switch (command) {
    case 'insert-data':
      const migrationService = application.get(MigrationService);
      await migrationService.insertData();
      break;
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await application.close();
  process.exit(0);
}

bootstrap();
