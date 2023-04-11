import React from 'react';

import { GraphiQL } from 'graphiql';
import { GraphiQLProvider } from '@graphiql/react';
import { QueryEditor } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import 'graphiql/graphiql.min.css';

//need user dev to input port
// const fetcher = createGraphiQLFetcher({url: 'http://localhost:3900/graphql' });

const fetcher = createGraphiQLFetcher({
  url: `http://localhost:3900/graphql`,
  //   shouldPersistHeaders: true,
  //   headers: { 'Content-Type': 'application/json' },
  skipSchemaValidation: true,
});


{/* <div>
<QueryEditor/>  
</div> */}
// </GraphiQLProvider>
const DisplayGraphiql = () => {
  return (
    <div id="graphiql-container">
      <GraphiQL fetcher={fetcher}/>
        {/* <GraphiQL fetcher={fetcher} /> */}
       </div>
  );
};

export default DisplayGraphiql;
