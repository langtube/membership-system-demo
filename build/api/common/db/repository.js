"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowRepositoryHelper = void 0;
const database_exception_1 = require("../exceptions/database.exception");
const lowdb_1 = require("./lowdb");
class LowRepositoryHelper {
    constructor() {
        this.db = (0, lowdb_1.getDb)();
    }
    runInCatch(fn) {
        try {
            const result = fn(this.db);
            return result;
        }
        catch (e) {
            throw new database_exception_1.DatabaseException(e);
        }
    }
    async findOne(condition) {
        const result = await this.runInCatch(async (db) => {
            return db.get(this.collectionName).find(condition).value();
        });
        return result;
    }
}
exports.LowRepositoryHelper = LowRepositoryHelper;
//# sourceMappingURL=repository.js.map