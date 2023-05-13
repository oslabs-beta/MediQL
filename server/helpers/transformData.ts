import originRespModel from '../models/originRespModel';
import SECRET from '../server';

interface Input {
  [key: string]: Record<string, unknown> | string;
}

interface FieldObject {
  name: string;
  children: any[];
}

interface RespObject {
  name: string;
  resp?: object | undefined;
  statusCode?: number | undefined;
  statusMsg?: string | undefined;
  children: any[];
}

interface ResolverResp {
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

export const transformData = async (input: Input): Promise<Output> => {
  console.log('input: ', input)
  if (input === null || input === undefined) {
    // handle case where input is null or undefined
    return { name: 'data', children: [] };
  }

  const resolverQueries = await originRespModel
    .find({ id: SECRET })
    .sort({ timestamp: -1 })
    .lean()
    .exec()
    .then((docs) => docs.reverse());

  // function code here
  const output: Output = { name: 'data', children: [] };
  //iterate through input object's alias
  for (let [inputKey, inputValue] of Object.entries(input)) {
    //matching the queries that are repeated, and taking the latest query that has been repeated
    const matchedQuery: ResolverResp | undefined = resolverQueries.filter(
      (obj: ResolverResp): boolean => {
        return obj.response?.alias === inputKey;
      }
    )[0];
    const { originResp, originRespStatus, originRespMessage } =
      matchedQuery?.response || {};
    const respObject: RespObject = {
      resp: originResp,
      statusCode: originRespStatus?.valueOf(),
      statusMsg: originRespMessage,
      name: inputKey,
      children: [],
    };
    if (!inputValue) {
      inputValue = {};
    }
    //iterate through the fields within alias
    for (const [fieldKey, fieldValue] of Object.entries(inputValue)) {
      if (!Object.keys(inputValue).length) {
        continue;
      }
      //if field value does not exist or has the value of null, push in an empty array into children field
      if (!fieldValue) {
        const fieldObject: FieldObject = {
          name: fieldKey,
          children: [],
        };
       respObject.children.push(fieldObject);
      } 
      else {
        const fieldObject = {
          name: fieldKey,
          children: [{ name: fieldValue }],
        };
       respObject.children.push(fieldObject);
      }
    }
    output.children.push(respObject);
  }
  console.log('output: ', output)
  return output;
};
