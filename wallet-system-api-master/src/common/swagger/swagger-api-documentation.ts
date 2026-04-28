import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTags } from './constatnt';

export class SwaggerApiDocumentation {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Wallet System API V1')
      .setDescription('The api structure documentation for wallet system app')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: false,
    });

    SwaggerModule.setup('/docs', app, document, {
      swaggerOptions: {
        displayRequestDuration: true,
      },
    });
  }
}
