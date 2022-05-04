import { Exception } from './base.exception';

export class ValidationException extends Exception {
  override name = 'ValidationException';
  override status = 400;
  details: ValidationExceptionField[];

  constructor(details: ValidationExceptionField[], cause?: Error | undefined) {
    super('Validation Exception', { cause });
    this.details = details;
  }
}

export class ValidationExceptionField {
  name: string;
  errors: string[];
}
