"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// 入口文件处使用source-map
const source_map_support_1 = __importDefault(require("source-map-support"));
source_map_support_1.default.install();
// 模块路径解s析
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const error_handle_1 = __importDefault(require("./middlewares/error-handle"));
const router_1 = __importDefault(require("./router"));
const app = express_1.default();
// 全局捕获未处理的错误
process.on("uncaughtException", function(err) {
  process.exit(1);
});
// 设置模板引擎
app.engine("html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", path_1.default.join(__dirname, "www/views"));
//设置静态资源目录
app.use(
  "/static",
  express_1.default.static(path_1.default.join(__dirname, "www/public"))
);
// 解析cookie
app.use(cookie_parser_1.default());
// 压缩
app.use(compression_1.default());
/* ----------- 只针对 /cgi-bin 的中间件 ----------- */
/**
 * 1. 超时中间件：超时错误的处理
 * 2. 回包格式化中间件：部署请求 resolve | reject 方法
 * 3. 数据上报中间件：统计 cgi 从开始接受请求到响应完成的耗时，对错误的信息进行上报
 **/
// app.all(`${baseUrl}/*`, timeoutHandler, formatHandler);
// 路由挂载
app.use(router_1.default);
// 错误处理，需要在所有路由注册完毕之后才 use
// 处理 系统错误 | 服务器未知错误 | 请求逻辑错误
app.use(error_handle_1.default);
app.listen(3001, () => console.log("Example app listening on port 3001!"));
// export default app;
//# sourceMappingURL=index.js.map
