import React from 'react';
import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import 'graphiql/graphiql.min.css'

const fetcher = createGraphiQLFetcher({url: 'http://localhost:3900/graphql' });

const DisplayGraphiql = () => {
    return(
        <div id='graphiql-container'>
         <GraphiQL  fetcher={fetcher}/>
        </div>
    )
};

export default DisplayGraphiql;