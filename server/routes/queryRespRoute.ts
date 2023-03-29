import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

import queryRespController from '../controllers/queryRespController';

router.get(
  '/',
  queryRespController.getLatestQueryResp,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.latestQuery);
  }
);

export default router;
