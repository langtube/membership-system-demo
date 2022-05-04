import { ValidationExceptionField } from './validation.exception';
export declare class ServerExceptionDto {
    status: number;
    message: string;
    name: string;
    validationErrors?: ValidationExceptionField[];
    constructor(status: number, message: string, name?: string, validationErrors?: ValidationExceptionField[]);
}
