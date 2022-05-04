import { Exception } from './base.exception';
export declare class DatabaseException extends Exception {
    name: string;
    status: number;
    constructor(cause: Error);
}
