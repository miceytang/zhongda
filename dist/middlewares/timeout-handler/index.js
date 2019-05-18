"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handle_1 = require("@middlewares/error-handle");
const index_1 = require("@config/index");
const retcode_1 = require("@middlewares/error-handle/retcode");
exports.default = (req, res, next) => {
    res.timer = setTimeout(() => {
        next(error_handle_1.generateErr(retcode_1.TIMOUT_ERROR));
    }, index_1.TIMEOUT);
    return next();
};
//# sourceMappingURL=index.js.map