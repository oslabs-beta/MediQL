import React from 'react';
import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

const fetcher = createGraphiQLFetcher({url: 'http://localhost:3900/graphql' });

const DisplayGraphiql = () => {
    return(
        <GraphiQL fetcher={fetcher}/>
    )
};

export default DisplayGraphiql;