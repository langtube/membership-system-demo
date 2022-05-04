"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = void 0;
const path_1 = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
let db;
function getDb() {
    if (!db) {
        const file = (0, path_1.join)(__dirname, 'db.json');
        const adapter = new FileSync(file);
        db = low(adapter);
        db.defaults({
            users: [],
            roles: [],
            'team-members': [],
            workspaces: [],
        }).write();
    }
    return db;
}
exports.getDb = getDb;
//# sourceMappingURL=lowdb.js.map