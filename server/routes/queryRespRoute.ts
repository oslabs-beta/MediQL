import { Request, Response } from 'express';

import express from 'express';
const router = express.Router();

import queryRespController from '../controllers/queryRespController';

router.get(
  '/',
  queryRespController.getLatestQueryResp,
  (req: Request, res: Response) => {
    console.log("res.locals.latestQuery: ", res.locals.latestQuery);
    res.status(200).json(res.locals.latestQuery);
  }
);

export default router;
