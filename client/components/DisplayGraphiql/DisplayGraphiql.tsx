import React from 'react';
import { GraphiQL } from 'graphiql';
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

const DisplayGraphiql = () => {
  return (
    <div id="graphiql-container">
      <GraphiQL fetcher={fetcher} />
    </div>
  );
};

export default DisplayGraphiql;
