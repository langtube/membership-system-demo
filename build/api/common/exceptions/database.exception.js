"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = void 0;
const base_exception_1 = require("./base.exception");
class DatabaseException extends base_exception_1.Exception {
    constructor(cause) {
        super('Database Exception', { cause });
        this.name = 'DatabaseException';
        this.status = 500;
    }
}
exports.DatabaseException = DatabaseException;
//# sourceMappingURL=database.exception.js.map