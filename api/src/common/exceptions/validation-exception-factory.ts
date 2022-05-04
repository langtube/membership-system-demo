import { ValidationError } from 'class-validator';

import { ValidationException } from './validation.exception';

/**
 * 参考：
{ 
    "message": "Constraint Violation",
    "status": 400,
    "validationErros": [
        {
            "field": "billing_address.first_name",
            "message": "may not be empty"
        },
        {
            "field": "groups",
            "message": "must not contain multiple different delivery addresses"
        },
        {
            "field": "groups[0].delivery_options.delivery_service",
            "message": "not supported"
        }
    ]
}
 */
export function validationExceptionFactory(errors: ValidationError[]) {
  const parsedErrors = flattenValidationErrors(errors);
  return new ValidationException(parsedErrors);
}

function flattenValidationErrors(validationErrors: ValidationError[]) {
  return validationErrors
    .flatMap((error) => mapChildrenToValidationErrors(error))
    .filter((item) => !!item.constraints)
    .flatMap((item) => ({
      name: item.property,
      errors: Object.values(item.constraints),
    }));
}

function mapChildrenToValidationErrors(
  error: ValidationError,
  parentPath?: string,
): ValidationError[] {
  if (!(error.children && error.children.length)) {
    return [error];
  }
  const validationErrors = [];
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }
  return validationErrors;
}

function prependConstraintsWithParentProp(
  parentPath: string,
  error: ValidationError,
): ValidationError {
  const constraints: any = {};
  for (const key in error.constraints) {
    constraints[key] = `${parentPath}.${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints,
  };
}
