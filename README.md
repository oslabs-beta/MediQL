# Mediql

## Description

MediQL is a GraphQL developer tool, built to work on top of GraphiQL, an open-source web-based integrated development environment (IDE). MediQL takes GraphiQL a step further by delivering query response visualization, error indication, and the ability to observe API response statuses and objects which GraphiQL can not.

Currently in Alpha.

## Installation (part 1)

1. Fork this repo and clone to local machine.
2. Run `npm i` in both server directory and client directory to install respective dependencies.
3. Create a `.env` file in the server folder, and assign the global environment variable `MONGODB_URI` with your personal MongoDB connection string (personal database connection string).
4. Run npm start dev. 
NOTE: Server will be running on localhost:3000 & Client will be running on localhost:8080
5. Visit http://localhost:8080/.

You should be able to see GraphiQL's GUI loaded up, however, we will need to integrate and connect your personal GraphQL project with this application before being able to test your multi-layered queries!

Let's install the necessary dependencies into your personal GraphQL project as it will be needing this to create the integrated development environment (ide).

## Installation (part 2)

1. As MediQL is built on top of GraphiQL, it is necessary to have GraphiQL and a /graphql server route set up prior to installing MediQL.
2. Run `npm i express-graphql` to install dependency for GraphiQL (Visit https://github.com/graphql/graphiql for more information)
3. Run `npm i mediql` to install dependency for MediQL (Visit https://github.com/MediQL/mediql-npm-package for more information)

Now, let's move on to configuring your personal GraphQL project and integrate it with MediQL!

## Usage

1. Within your GraphQL project, in your schema file or file with resolvers (i.e., schema.js), import the `postOriginResp` function from the `mediql` package using CommonJS module syntax.

```javascript
const { postOriginResp } = require("mediql");
```

2. In that same file, invoke the postOriginResp function inside each of your resolver functions with the specific arguments of `response`, `parsedResponse`, and `info`.

```javascript
//declare & assign the response variable as the result of your fetch request to an external api url 
const response = await fetch('url');
//declare & assign the parsedResponse variable as the parsed JSON response of your response variable
const parsedResponse = await response.json();
//invoke mediql's packaged function with the arguments of response, parsedResponse, and info respectively.
postOriginResp(response, parsedResponse, info);
//return parsedResponse as this is the typical GraphQL resolver set up
return parsedResponse;
```

3. Before the next step, you will need to have a '/graphql' endpoint route configured for GraphiQL in your server file. (Visit https://github.com/graphql/graphiql for more information)

4. In your server file (i.e., server.js), import the `postQueryResp` function from the `mediql` package using CommonJS module syntax.

```javascript
const { postQueryResp } = require("mediql");
```

5. Within your '/graphql' endpoint route, include the extensions option and specify the function outlined below and invoke the `postQueryResp` function with the argument of `result` inside of it.

```javascript
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    context: ({ req }) => ({ req }),
    extensions: async (
      { document, variables, operationName, result }) => {
      //invoke postQueryResp function with the argument of result.
      postQueryResp(result);
    },
  })
);
```

5. Make sure your GraphQL project's server/client are running on a PORT that is not localhost:3000 or localhost:8080 as the integrated development environment (IDE) will be using those ports.

6. Now, start up your GraphQL project server and head over to http://localhost:8080/ on your browser. 

7. Input your GraphQL project's server PORT# and get those queries in!


## Features

### GraphiQL

### Query Response Visualization & Error Indication

### API Response Transparency

### Light/Dark Theme

## Tech Stack

## Read More

## Co-Creators

## Acknowledgements

## Contributing

## Roadmap
