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
import originRespModel from '../models/originRespModel'
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
  resp: string;
  statusCode: string;
  statusMsg: string
  children: any[];
}

interface resolverResp {
  response: {
    alias: string;
    originResp: Object;
    originRespStatus: Number;
    originRespMessage: string;
  }
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
    const latestQuery = await queryResModel.find({}).sort({ _id: -1 }).limit(1);
    const resolverQueries = await originRespModel.find({}).sort({ _id: -1 }).limit(4);

    console.log('latest query: ', latestQuery);
    console.log('latest origin resps: ', resolverQueries);
    const dataObj = latestQuery[0].response.queryResp.data;
    console.log('dataObj: ', dataObj);

    //pull data from originResp database
    
    // transform happens after combining data
    const transformData = async (input: Input) => {
      const output: Output = { name: 'data', children: [] };
      for (let [inputKey, inputValue] of Object.entries(input)) {
        const matchedQuery = await resolverQueries.filter((obj : resolverResp) => {return (obj.response.alias === inputKey)})[0];
        const {originResp, originRespStatus, originRespMessage} = matchedQuery.response;
        console.log("matchedQuery: ", matchedQuery)
        //const movieObject: MovieObject = { resp: '{}', statusCode: '200', statusMsg: 'x', name: inputKey, children: [] };
        const movieObject: MovieObject = { resp: originResp, statusCode: originRespStatus, statusMsg: originRespMessage, name: inputKey, children: [] };
        if (!inputValue) {
          inputValue = {};
        }
        for (const [fieldKey, fieldValue] of Object.entries(inputValue)) {
          if (!Object.keys(inputValue).length) {
            continue;
          }
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

      console.log('output line 90: ', output);
      return output;
    };

    const output = transformData(dataObj);
    res.locals.latestQuery = output;

    
    //delete originresp database
    await originRespModel.deleteMany({});
    //delete queryresp database
    await queryResModel.deleteMany({});

    return next();
  },
};
