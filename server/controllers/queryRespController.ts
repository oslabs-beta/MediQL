// const queryRespController = {};
// const queryResModel = require('../models/queryResModel')

// queryRespController.getLatestQueryResp = async (req,res,next) => {
//     // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
//     const latestQuery = await queryResModel.find({ });
//     // const latestQuery = await queryResModel.find({ }).sort({_id:-1}).limit(1);
//     // const latestQuery = await queryResModel.findOne().sort({ createdAt: -1 });;

//     // const parsed_data = latestQuery.map((item) => {
//     //     if(item.response?.queryResp){
//     //         return item.response.queryResp
//     //     };
//     // });

//     // const result = parsed_data.filter((element)=>{
//     //     return element !== undefined
//     // });

//     // console.log('latest: ', latestQuery)
//     res.locals.latestQuery = latestQuery;
//     return next();
// }

// module.exports = queryRespController;
// const queryRespController = {};
import queryResModel from '../models/queryResModel';
import { Request, Response, NextFunction } from 'express';

interface Input {
  [key: string]: Record<string, unknown> | string;
}

interface FieldObject {
  name: string;
  children: any[];
}

interface MovieObject {
  name: string;
  children: any[];
}

interface Output {
  name: string;
  children: any[];
}

export default {
  getLatestQueryResp: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // db.find_id.find({ }, {"_id": 1}).sort({_id:-1}).limit(1)
    const latestQuery = await queryResModel.find({}).sort({ _id: -1 }).limit(1);

    // const latestQuery = await queryResModel.findOne().sort({ createdAt: -1 });;
    console.log('latest: ', latestQuery);
    const dataObj = latestQuery[0].response.queryResp.data;
    console.log('dataObj: ', dataObj);

    const transformData = (input: Input) => {
      const output: Output = { name: 'data', children: [] };
      for (let [inputKey, inputValue] of Object.entries(input)) {
        const movieObject: MovieObject = { name: inputKey, children: [] };
        if (!inputValue) {
          inputValue = { [`${inputValue}`]: inputValue };
        }
        for (const [fieldKey, fieldValue] of Object.entries(inputValue)) {
          if (!fieldValue) {
            const fieldObject: FieldObject = {
              name: fieldKey,
              children: [],
            };
            movieObject.children.push(fieldObject);
          } else {
            const fieldObject = {
              name: fieldKey,
              children: [{ name: fieldValue }],
            };
            movieObject.children.push(fieldObject);
          }
        }
        output.children.push(movieObject);
      }
      return output;
    };

    const output = transformData(dataObj);
    res.locals.latestQuery = output;
    return next();
  },
};