import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class GlobalExceptionsFilter extends BaseExceptionFilter<Error> {
    private readonly logger;
    catch(exception: any, host: ArgumentsHost): void;
}
