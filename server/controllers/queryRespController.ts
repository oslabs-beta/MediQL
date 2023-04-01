import queryResModel from '../models/queryResModel';
import originRespModel from '../models/originRespModel';
import { Request, Response, NextFunction } from 'express';

interface Input {
  [key: string]: Record<string, unknown> | string;
}
interface MatchedQuery {
  response?: {
    alias: string;
    originResp: Object;
    originrespstatus: Number;
    originRespMessage: string;
  };
}
interface FieldObject {
  name: string;
  children: any[];
}

interface MovieObject {
  name: string;
  resp?: object | undefined;
  statusCode?: number | undefined;
  statusMsg?: string | undefined;
  children: any[];
}

interface resolverResp {
  response?: {
    alias: string;
    originResp?: Object;
    originRespStatus?: Number;
    originRespMessage?: string;
  };
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
    const latestQuery = await queryResModel.find({});
    const resolverQueries = await originRespModel.find({});

    if (!latestQuery.length) {
      return next({ err: 'latestQuery empty' });
    }

    if (!resolverQueries.length) {
      await queryResModel.deleteMany({});

      return next({ err: 'resolver empty' });
    }

    const dataObj = latestQuery[latestQuery.length - 1].response.queryResp.data;

    // transform happens after combining data
    const transformData = async (input: Input): Promise<Output> => {
      const output: Output = { name: 'data', children: [] };
      for (let [inputKey, inputValue] of Object.entries(input)) {
        const matchedQuery: resolverResp | undefined = resolverQueries.filter(
          (obj: resolverResp): boolean => {
            return obj.response?.alias === inputKey;
          }
        )[0];
        const { originResp, originRespStatus, originRespMessage } =
          matchedQuery?.response || {};
        const movieObject: MovieObject = {
          resp: originResp,
          statusCode: originRespStatus?.valueOf(),
          statusMsg: originRespMessage,
          name: inputKey,
          children: [],
        };
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
      return output;
    };

    const newDataObj = await transformData(dataObj);
    res.locals.latestQuery = newDataObj;
    //delete originresp database
    await originRespModel.deleteMany({});
    //delete queryresp database
    await queryResModel.deleteMany({});

    return next();
  },
};
