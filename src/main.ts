import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    Sentry.init({
        dsn: process.env.SENTRY_DNS,
    });

    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then((load) => {});
