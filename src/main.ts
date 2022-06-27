import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(3000, () =>
    console.log('==========server started=========='),
  );
}
start();
