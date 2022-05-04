import { ErrorWithCause } from 'pony-cause';

export abstract class Exception extends ErrorWithCause<Error> {
  abstract status: number;
  abstract name: string;
}
