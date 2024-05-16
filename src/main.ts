import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

function buildApiDocs(app: NestExpressApplication): void {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('RMS Payment')
    .setDescription(
      'Tech challenge for postgraduate studies in software architecture \n Payment microservice',
    )
    .setVersion('1.0')
    .addTag('FIAP - Pós Software Architecture')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  buildApiDocs(app);
  const port = Number(config().parsed['PORT'] || process.env.PORT);
  console.info(`App assigned to run on port ${port}`);
  await app.listen(port);
  console.info(`App RMS Payment is running on port  ${port}`);
}

bootstrap();
