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

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

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
      name: 'gid',
      resave: false,
      secret: 'secret',
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

  if (process.env.NODE_ENV === 'development') {
    setupSwagger(app);

    app.enableCors({
      credentials: true,
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    });
  }

  await app.listen(3003, '0.0.0.0');

  const url = await app.getUrl();
  logger.log('http server listen on : ' + url);
}

bootstrap();
