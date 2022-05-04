import { ValidationExceptionField } from './validation.exception';

export class ServerExceptionDto {
  public status: number;
  public message: string;
  public name: string;
  public validationErrors?: ValidationExceptionField[];

  constructor(
    status: number,
    message: string,
    name?: string,
    validationErrors?: ValidationExceptionField[],
  ) {
    this.status = status;
    this.message = message;
    this.name = name || 'Error';
    this.validationErrors = validationErrors;
  }
}
