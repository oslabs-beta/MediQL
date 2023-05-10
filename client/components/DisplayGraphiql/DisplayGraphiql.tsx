import React, { useContext } from "react";

import { GraphiQL } from "graphiql";
import { GraphiQLProvider } from "@graphiql/react";
import { QueryEditor } from "@graphiql/react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";

import "graphiql/graphiql.min.css";
import PortContext from "../../contextStore/port-context";

// </GraphiQLProvider>
const DisplayGraphiql = () => {
  const { port } = useContext(PortContext);
  return (
    <div id="graphiql-container">
      <GraphiQL
        fetcher={createGraphiQLFetcher({
          url: `http://localhost:${port}/graphql`,
          //   shouldPersistHeaders: true,
          //   headers: { 'Content-Type': 'application/json' },
          skipSchemaValidation: true,
        })}
      />
    </div>
  );
};

export default DisplayGraphiql;
