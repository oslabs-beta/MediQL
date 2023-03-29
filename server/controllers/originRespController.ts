import originRespModel from '../models/originRespModel';

import { Request, Response, NextFunction } from 'express';


export default {
  getOriginResps: async (req: Request, res: Response, next: NextFunction) => {
  // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
  const originResps = await originRespModel.find({});
  res.locals.originResps = originResps;
  return next();
},

  removeOriginResps: async (req: Request, res: Response, next: NextFunction) => {
  // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
  const originResps = await originRespModel.remove({});
  res.locals.originResps = originResps;
  return next();
}
};


