import { Exception } from './base.exception';
export declare class ValidationException extends Exception {
    name: string;
    status: number;
    details: ValidationExceptionField[];
    constructor(details: ValidationExceptionField[], cause?: Error | undefined);
}
export declare class ValidationExceptionField {
    name: string;
    errors: string[];
}
