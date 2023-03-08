const originRespController = {};
const originRespModel = require('../models/originRespModel')


originRespController.getOriginResps = async (req, res, next) => {
  // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
  const originResps = await originRespModel.find({});

  const parsed_data = originResps.map((item) => {
    const {alias, parentNode, originResp, originRespStatus, originRespMessage } = item.response.client;
    return {alias, parentNode, originResp, originRespStatus, originRespMessage};
  });

//   console.log("latest: ", latestQuery);
  res.locals.originResps = originResps;
  return next();
};

module.exports = originRespController;