import { config as envSetup } from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app.module';
import {
  GlobalExceptionsFilter,
  setupSwagger,
  validationExceptionFactory,
} from './common';

async function bootstrap() {
  const logger = new Logger('api:bootstrap');
  envSetup();
  const apiGlobalPrefix = process.env.API_GLOBAL_PREFIX;
  if (!apiGlobalPrefix) {
    throw new Error('请设置环境变量 API_GLOBAL_PREFIX');
  }
  const sessionCookieName = process.env.SESSION_COOKIE_NAME;
  if (!sessionCookieName) {
    throw new Error('请设置环境变量 SESSION_COOKIE_NAME');
  }
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error('请设置环境变量 SESSION_SECRET');
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(apiGlobalPrefix);

  /**
   * NOTICE
   * The default server-side session storage is purposely not designed for a production environment.
   * It will leak memory under most conditions, does not scale past a single process,
   * and is meant for debugging and developing. Read more in the official repository.
   */
  app.use(
    session({
      cookie: {
        path: '/',
        httpOnly: true,
        signed: false,
      },
      name: sessionCookieName,
      resave: false,
      secret: sessionSecret,
      saveUninitialized: true,
      proxy: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));

  setupSwagger(app);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      credentials: true,
      origin: ['http://localhost:3000'],
    });
  }

  await app.listen(3003, '0.0.0.0');

  logger.log('http server listen on : http://localhost:3003');
}

bootstrap();
