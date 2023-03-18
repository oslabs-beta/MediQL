const originRespController = {};
const originRespModel = require('../models/originRespModel')


originRespController.getOriginResps = async (req, res, next) => {
  // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
  const originResps = await originRespModel.find({});
  res.locals.originResps = originResps;
  return next();
};

originRespController.removeOriginResps = async (req, res, next) => {
  // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
  const originResps = await originRespModel.remove({});
  res.locals.originResps = originResps;
  return next();
};


module.exports = originRespController;