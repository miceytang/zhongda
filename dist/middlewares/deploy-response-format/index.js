"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retcode_1 = require("@middlewares/error-handle/retcode");
function pack(packData) {
    return {
        retCode: packData.retCode,
        retMsg: packData.retMsg,
        retObj: packData.retObj || null
    };
}
exports.default = (req, res, next) => {
    // 成功请求
    res.resolve = (packData) => {
        packData.retCode = packData.retCode || 0;
        packData.retMsg = packData.retMsg || 'success';
        res.packData = packData;
        // 清除计时器
        clearTimeout(res.timer);
        if (res.headersSent)
            return;
        return res.json(pack(packData));
    };
    // 失败请求
    res.reject = (packData) => {
        packData.retCode = packData.retCode || retcode_1.SERVICE_ERROR;
        packData.retMsg = packData.retMsg || 'error';
        res.packData = packData;
        // 清除计时器
        clearTimeout(res.timer);
        if (res.headersSent)
            return;
        return res.json(pack(packData));
    };
    next();
};
//# sourceMappingURL=index.js.map