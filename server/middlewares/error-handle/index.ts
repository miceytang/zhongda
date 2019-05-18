
import express from 'express';
import { Response } from '@middlewares/deploy-response-format';
import { baseRenderUrl, baseUrl } from '@config/index';

import * as CONSTANT from './retcode';


export class BaseError extends Error {
  code: number;
  message: string;
  stack?: string;
}

export function generateErr(
  code?: number,
  message?: string,
  stack?: string
): BaseError {
  let err = new BaseError(message || '服务错误');
  err.code = code;
  stack && (err.stack = stack);
  return err;
}

// 渲染页面出错
function handleRenderErr(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  const url = req.url.split('/')[1];
  if (url === baseRenderUrl) {
    res.render('error', { err });
    return true;
  } else {
    return false;
  }
}

// 超时错误处理
function handleTimeOut(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  if (err.code === CONSTANT['TIMOUT_ERROR']) {
    res.reject({
      retCode: CONSTANT['TIMOUT_ERROR'],
      retMsg: 'CGI TIMEOUT'
    });
    return true;
  } else {
    return false;
  }
}

// CGI 或 资源 404 错误
function handleNotFound(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  if (err.code === CONSTANT['NOT_FOUND']) {
    const url = `/${req.url.split('/')[1]}`;
    // 如果是 CGI 错误
    if (url === baseUrl) {
      res.reject({
        retCode: CONSTANT['NOT_FOUND'],
        retMsg: 'CGI NOT FOUND'
      });
      // render 错误返回 404 页面
    } else {
      res.status(404).render('404');
    }
    return true;
  } else {
    return false;
  }
}

// 逻辑错误，登录鉴权错误处理
function handleLoginErr(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  if (err.code === CONSTANT['LOGIN_ERROR']) {
    res.reject({
      retCode: CONSTANT['LOGIN_ERROR'],
      retMsg: err.message || '登录鉴权失败'
    });
    return true;
  } else {
    return false;
  }
}

function handleAuthErr(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  if (err.code === CONSTANT['AUTH_ERROR']) {
    res.reject({
      retCode: CONSTANT['AUTH_ERROR'],
      retMsg: err.message || '权限校验失败'
    });
    return true;
  } else {
    return false;
  }
}

// 逻辑错误，请求参数格式错误处理
function handleParamsErr(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  if (err.code === CONSTANT['VALIDATE_ERROR']) {
    res.reject({
      retCode: CONSTANT['VALIDATE_ERROR'],
      retMsg: err.message
    });
    return true;
  } else {
    return false;
  }
}

// 逻辑错误，值不存在
function handleUselessKeyErr(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  // 这里定 -1 为返回空值的情况
  if (err.code === -1) {
    res.reject({
      retCode: -1,
      retMsg: err.message
    });
    return true;
  } else {
    return false;
  }
}

// 默认报错
function handleSystemErr(
  err: BaseError,
  req: express.Request,
  res: Response
): boolean {
  res.reject({
    retCode: err.code || CONSTANT['SERVICE_ERROR'],
    retMsg: err.message || '服务错误'
  });
  return true;
}

const errorHandler = (
  err: BaseError,
  req: express.Request,
  res: Response,
  next: express.NextFunction
): void => {
  // 先把错误栈信息打印出来，便于 debug 和 染色，其他上报全部放在 report-cgi-handler 中间件来执行
  // 针对不同错误进行处理
  if (handleRenderErr(err, req, res)) return;
  if (handleNotFound(err, req, res)) return;
  if (handleTimeOut(err, req, res)) return;
  if (handleLoginErr(err, req, res)) return;
  if (handleAuthErr(err, req, res)) return;
  if (handleParamsErr(err, req, res)) return;
  if (handleUselessKeyErr(err, req, res)) return;
  if (handleSystemErr(err, req, res)) return;
};

export default errorHandler;
