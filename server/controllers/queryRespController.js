const queryRespController = {};
const queryResModel = require('../models/queryResModel')

queryRespController.getLatestQueryResp = async (req,res,next) => {
    // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
    const latestQuery = await queryResModel.find({ });
    // const latestQuery = await queryResModel.find({ }).sort({_id:-1}).limit(1);
    // const latestQuery = await queryResModel.findOne().sort({ createdAt: -1 });;

    // const parsed_data = latestQuery.map((item) => {
    //     if(item.response?.queryResp){
    //         return item.response.queryResp
    //     };
    // });
      
    // const result = parsed_data.filter((element)=>{
    //     return element !== undefined
    // });

    // console.log('latest: ', latestQuery)
    res.locals.latestQuery = latestQuery;
    return next();
}

module.exports = queryRespController;