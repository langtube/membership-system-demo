"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveReactAppMiddleware = void 0;
const path_1 = require("path");
const node_fs_1 = require("node:fs");
function serveReactAppMiddleware(req, res, next) {
    const { url } = req;
    if (url.startsWith('/api')) {
        next();
    }
    else {
        let filePath = (0, path_1.join)(process.cwd(), '../app', url);
        const isExits = (0, node_fs_1.existsSync)(filePath);
        if (!isExits || (isExits && (0, node_fs_1.statSync)(filePath).isDirectory())) {
            filePath = (0, path_1.join)(process.cwd(), '../app', '/index.html');
        }
        console.log("serve",url,filePath)
        res.sendFile(filePath);
    }
}
exports.serveReactAppMiddleware = serveReactAppMiddleware;
//# sourceMappingURL=serve-react-app.middleware.js.map