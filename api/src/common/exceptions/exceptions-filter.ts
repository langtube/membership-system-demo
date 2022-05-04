import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { stackWithCauses, messageWithCauses } from 'pony-cause';

import { Exception } from './base.exception';
import { ServerExceptionDto } from './server.exception.dto';
import { ValidationException } from './validation.exception';

@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter<Error> {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const eName = exception?.name;
    const eMsg =
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : messageWithCauses(exception);

    console.error('GlobalExceptionsFilter catch', exception.name);

    const dto = new ServerExceptionDto(
      HttpStatus.INTERNAL_SERVER_ERROR,
      eMsg,
      eName,
    );

    if (exception instanceof Exception) {
      dto.status = exception.status;
      if (exception instanceof ValidationException) {
        dto.validationErrors = exception.details;
      }
    }
    if (exception instanceof HttpException) {
      dto.status = exception.getStatus();
    }

    this.logger.error(messageWithCauses(exception), stackWithCauses(exception));

    response
      .status(dto.status)
      .send(/* WARN 如果 send 了一个 Error 实例会再走一遍 filter*/ dto);
  }
}
