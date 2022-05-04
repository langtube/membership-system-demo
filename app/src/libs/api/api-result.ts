import { ApiError } from "./api-error";

export class ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: ApiError;

  constructor(ok: boolean, data?: T, error?: ApiError) {
    this.ok = ok;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T) {
    return new ApiResult(true, data);
  }

  static failed(error: ApiError) {
    return new ApiResult(false, undefined, error);
  }
}
