"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationExceptionFactory = void 0;
const validation_exception_1 = require("./validation.exception");
function validationExceptionFactory(errors) {
    const parsedErrors = flattenValidationErrors(errors);
    return new validation_exception_1.ValidationException(parsedErrors);
}
exports.validationExceptionFactory = validationExceptionFactory;
function flattenValidationErrors(validationErrors) {
    return validationErrors
        .flatMap((error) => mapChildrenToValidationErrors(error))
        .filter((item) => !!item.constraints)
        .flatMap((item) => ({
        name: item.property,
        errors: Object.values(item.constraints),
    }));
}
function mapChildrenToValidationErrors(error, parentPath) {
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
function prependConstraintsWithParentProp(parentPath, error) {
    const constraints = {};
    for (const key in error.constraints) {
        constraints[key] = `${parentPath}.${error.constraints[key]}`;
    }
    return Object.assign(Object.assign({}, error), { constraints });
}
//# sourceMappingURL=validation-exception-factory.js.map