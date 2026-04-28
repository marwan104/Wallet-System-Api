import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerApiDocumentation } from './common/swagger/swagger-api-documentation';

export function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

export function setupSwagger(app: INestApplication): void {
  SwaggerApiDocumentation.setup(app);
}
