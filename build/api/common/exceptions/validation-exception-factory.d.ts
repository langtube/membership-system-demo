import { ValidationError } from 'class-validator';
import { ValidationException } from './validation.exception';
export declare function validationExceptionFactory(errors: ValidationError[]): ValidationException;
