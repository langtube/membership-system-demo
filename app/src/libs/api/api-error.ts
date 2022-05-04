import {
  ServerExceptionDto,
  ValidationExceptionField,
} from "./server.exception.dto";

export class ApiError extends Error {
  public status: number;
  public name: string;
  public validationErrors?: ValidationExceptionField[];

  constructor(dto: ServerExceptionDto) {
    const reason = dto.message
      ? dto.message
      : `${dto.status}, an unknown error`;
    super(`${dto.name}: ${reason}`);

    this.status = dto.status;
    this.name = "ApiError";
    this.validationErrors = dto.validationErrors;
  }
}
