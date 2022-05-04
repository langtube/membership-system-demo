"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerExceptionDto = void 0;
class ServerExceptionDto {
    constructor(status, message, name, validationErrors) {
        this.status = status;
        this.message = message;
        this.name = name || 'Error';
        this.validationErrors = validationErrors;
    }
}
exports.ServerExceptionDto = ServerExceptionDto;
//# sourceMappingURL=server.exception.dto.js.map