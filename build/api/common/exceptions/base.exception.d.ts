import { ErrorWithCause } from 'pony-cause';
export declare abstract class Exception extends ErrorWithCause<Error> {
    abstract status: number;
    abstract name: string;
}
