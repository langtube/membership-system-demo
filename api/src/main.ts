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
import { setupConfig } from './common/config';

async function bootstrap() {
  const logger = new Logger('api:bootstrap');

  const { apiGlobalPrefix, sessionCookieName, sessionSecret } = setupConfig();

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      credentials: true,
      origin: ['http://localhost:3000'],
    });
  }

  setupSwagger(app);

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

  app.setGlobalPrefix(apiGlobalPrefix);

  await app.listen(3003, '0.0.0.0');

  logger.log('http server listen on : http://localhost:3003');
}

bootstrap();
