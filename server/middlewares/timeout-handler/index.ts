import express from 'express';
import { generateErr } from '@middlewares/error-handle';
import { Response } from '../deploy-response-format';
import { TIMEOUT } from '@config/index';
import { TIMOUT_ERROR } from '@middlewares/error-handle/retcode';

export default (
  req: express.Request,
  res: Response,
  next: express.NextFunction
) => {
  res.timer = setTimeout(() => {
    next(generateErr(TIMOUT_ERROR));
  }, TIMEOUT);
  return next();
};
