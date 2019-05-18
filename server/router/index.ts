/**
 * 路由入口，建议写在同一个文件中，不同的父链接用注释隔开，遵循以下代码书写规范。
 **/
import express from "express";
import { baseUrl, baseRenderUrl } from "@config/index";
import { generateErr } from "@middlewares/error-handle";
import { NOT_FOUND } from "@middlewares/error-handle/retcode";
import CGI_ROUTERS from "./router";
import RENDER_ROUTERS from "./render";

const Router: express.Router = express.Router();

/* --------- path: '/cgi-bin/*' --------- */
// Router.use(baseUrl, CGI_ROUTERS);
/* --------- path: '/views/*' --------- */
// Router.use(baseRenderUrl, RENDER_ROUTERS);

Router.use(baseRenderUrl, RENDER_ROUTERS);

/* --------- 404处理 --------- */
Router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.redirect("http://yuandaqh.com.cn/zhongyi/index.html");
    // return next(
    //   generateErr(NOT_FOUND, `访问 CGI 不存在！PATH 为 ${req.originalUrl}。`)
    // );
  }
);

export default Router;
