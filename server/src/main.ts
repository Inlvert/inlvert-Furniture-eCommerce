import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
  });

  app.use('/webhooks', express.raw({ type: 'application/json' }));
 
  app.use(express.json());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();