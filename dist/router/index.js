"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 路由入口，建议写在同一个文件中，不同的父链接用注释隔开，遵循以下代码书写规范。
 **/
const express_1 = __importDefault(require("express"));
const index_1 = require("@config/index");
const render_1 = __importDefault(require("./render"));
const Router = express_1.default.Router();
/* --------- path: '/cgi-bin/*' --------- */
// Router.use(baseUrl, CGI_ROUTERS);
/* --------- path: '/views/*' --------- */
// Router.use(baseRenderUrl, RENDER_ROUTERS);
Router.use(index_1.baseRenderUrl, render_1.default);
/* --------- 404处理 --------- */
Router.use((req, res, next) => {
    res.redirect('http://yuandaqh.com.cn/views/index.html');
    // return next(
    //   generateErr(NOT_FOUND, `访问 CGI 不存在！PATH 为 ${req.originalUrl}。`)
    // );
});
exports.default = Router;
//# sourceMappingURL=index.js.map