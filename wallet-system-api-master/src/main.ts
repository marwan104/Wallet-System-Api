import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './common/configuration/configuration.interface';
import { Logger } from '@nestjs/common';
import { setupPipes, setupSwagger } from './app-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  setupPipes(app);
  setupSwagger(app);

  const configService: ConfigService<ConfigurationType> =
    app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
  Logger.log(`${configService.getOrThrow<string>('APP_NAME')} is running!`);
}
bootstrap();
