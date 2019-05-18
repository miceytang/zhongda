/**
 * 该中间件用于部署 res 对象上面的回包方法：resolve | reject
 **/
import express from 'express';
import { SERVICE_ERROR } from '@middlewares/error-handle/retcode';

export interface Response extends express.Response {
  timer: any;
  packData: PackData;
  resolve(data: PackData): void;
  reject(data: PackData): void;
}

function pack(packData: PackData): PackData {
  return {
    retCode: packData.retCode,
    retMsg: packData.retMsg,
    retObj: packData.retObj || null
  };
}

export default (
  req: express.Request,
  res: Response,
  next: express.NextFunction
): void => {
  // 成功请求
  res.resolve = (packData: PackData): any => {

    packData.retCode = packData.retCode || 0;
    packData.retMsg = packData.retMsg || 'success';

    res.packData = packData;

    // 清除计时器
    clearTimeout(res.timer);
    if (res.headersSent) return;

    return res.json(pack(packData));
  };
  // 失败请求
  res.reject = (packData: PackData): any => {
  

    packData.retCode = packData.retCode || SERVICE_ERROR;
    packData.retMsg = packData.retMsg || 'error';

    res.packData = packData;

    // 清除计时器
    clearTimeout(res.timer);
    if (res.headersSent) return;

    return res.json(pack(packData));
  };
  next();
};
