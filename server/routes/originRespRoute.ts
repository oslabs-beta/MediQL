import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

import originRespController from '../controllers/originRespController';

router.get(
  '/',
  originRespController.getOriginResps,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.originResps);
  }
);

router.post(
  '/remove',
  originRespController.removeOriginResps,
  (req: Request, res: Response) => {
    res.status(200).json('removed originRespcollection in database');
  }
);

export default router;
