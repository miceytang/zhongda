// 入口文件处使用source-map
import sourceMap from "source-map-support";
sourceMap.install();

// 模块路径解s析
require("module-alias/register");

import { baseUrl } from "./config/index";
import express from "express";
import path from "path";

import cookieParser from "cookie-parser";

import compression from "compression";

import timeoutHandler from "./middlewares/timeout-handler";
import formatHandler from "./middlewares/deploy-response-format";
import errorHandler from "./middlewares/error-handle";
import router from "./router";

const app = express();

// 全局捕获未处理的错误
process.on("uncaughtException", function(err) {
  process.exit(1);
});

// 设置模板引擎
app.engine("html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "www/views"));

//设置静态资源目录
app.use("/static", express.static(path.join(__dirname, "www/public")));

// 解析cookie
app.use(cookieParser());

// 压缩
app.use(compression());

/* ----------- 只针对 /cgi-bin 的中间件 ----------- */
/**
 * 1. 超时中间件：超时错误的处理
 * 2. 回包格式化中间件：部署请求 resolve | reject 方法
 * 3. 数据上报中间件：统计 cgi 从开始接受请求到响应完成的耗时，对错误的信息进行上报
 **/
// app.all(`${baseUrl}/*`, timeoutHandler, formatHandler);

// 路由挂载
app.use(router);

// 错误处理，需要在所有路由注册完毕之后才 use
// 处理 系统错误 | 服务器未知错误 | 请求逻辑错误
app.use(errorHandler);

app.listen(3001, () => console.log("Example app listening on port 3001!"));
// export default app;
