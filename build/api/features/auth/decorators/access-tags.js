"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTags = exports.ACCESS_TAGS_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ACCESS_TAGS_KEY = 'access_tags';
const AccessTags = (...tags) => {
    if (!tags || tags.length < 1) {
        throw new Error('AccessTags decorator must have at least one tag');
    }
    return (0, common_1.SetMetadata)(exports.ACCESS_TAGS_KEY, tags);
};
exports.AccessTags = AccessTags;
//# sourceMappingURL=access-tags.js.map