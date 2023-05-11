<h1 align="center">MediQL</h1>

<p align="center">Developer Tool for GraphQL Response Visualization & Error Transparency</p>

## Description

MediQL is a GraphQL developer tool, built to work on top of GraphiQL, an open-source web-based integrated development environment (IDE). MediQL takes GraphiQL a step further by delivering query response visualization, error indication, and the ability to observe API response statuses and objects which GraphiQL can not.

Currently in Alpha.

## Installation (part 1)

1. Fork this repo and clone to local machine.
2. Run `npm i` in both server directory and client directory to install respective dependencies.
3. Create a `.env` file in the server folder, and assign the global environment variable `MONGODB_URI` with your personal MongoDB connection string (personal database connection string).
4. Run npm start dev. 
(**NOTE**: Server will be running on localhost:3003 & Client will be running on localhost:8080)
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

5. Make sure your GraphQL project's server/client are running on a PORT that is not localhost:3003 or localhost:8080 as the integrated development environment (IDE) will be using those ports.

6. Now, start up your GraphQL project server and head over to http://localhost:8080/ on your browser. 

7. Input your GraphQL project's server PORT# and get those queries in!


## Features

### :sparkles: GraphiQL :sparkles: 

GraphiQL's user interface & functionality is provided for testing GraphQL queries alongside our visualizer extension, making a completely integrated development environment for developers. Plug in your GraphQL project's server PORT and get querying!

~INSERT GIF HERE~

### :sparkles: Query Response Visualization & Error Indication :sparkles: 

When a GraphQL query has been made, MediQL visualizes the query response with as a tree of nodes on the right side of your screen. Errors are indicated in red. Possible errors or null values are indicated in orange. Lastly, completed queries with no issues are indicated in green.

~INSERT GIF HERE~

### :sparkles: API Response Transparency :sparkles: 

As we all know, GraphQL responses do not provide API Response Transparency. If a field is not available, the developer ends up with a null value, with no indication of what type of API error was given originally. The  developer would be at risk of the ambiguity of errors. 

This is where MediQL comes in and saves the day!

Each node in the visualizer is clickable and provides insight on that specific resolver's query response! The original API response's status codes and objects are provided to you with no additional call to the external API's. The developer has the ability to look into the original API's response object as well. 

~INSERT GIF HERE~

### :sparkles: Light/Dark Theme :sparkles: 

We also offer a light and dark theme that is integrated with GraphiQL's user interface which allows users to customize their experience and choose the visual style that best suits their preferences and needs.

~INSERT GIF HERE~

## Tech Stack

~INSERT LOGOS~

## Read More



## Co-Creators

- James Huang
  - [GitHub](https://github.com/JamesJunJieHuang)
  - [LinkedIn](https://www.linkedin.com/in/jamesjhuang/)
- Lily Hoong
  - [GitHub](https://github.com/hoonglily)
  - [LinkedIn](https://www.linkedin.com/in/lilyhoong/)
- Noah Tofte
  - [GitHub](https://github.com/nAndrewT)
  - [LinkedIn](https://www.linkedin.com/in/ntofte/)
- Jake Ruiz
  - [GitHub](https://github.com/J-Ruiz)
  - [LinkedIn](https://www.linkedin.com/in/jake-ruiz/)


## Acknowledgements

## Contributing

## Roadmap
