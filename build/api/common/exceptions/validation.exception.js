"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionField = exports.ValidationException = void 0;
const base_exception_1 = require("./base.exception");
class ValidationException extends base_exception_1.Exception {
    constructor(details, cause) {
        super('Validation Exception', { cause });
        this.name = 'ValidationException';
        this.status = 400;
        this.details = details;
    }
}
exports.ValidationException = ValidationException;
class ValidationExceptionField {
}
exports.ValidationExceptionField = ValidationExceptionField;
//# sourceMappingURL=validation.exception.js.map