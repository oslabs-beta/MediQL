<h1 align="center">MediQL</h1>

<p align="center">Developer Tool for GraphQL Response Visualization & Error Transparency</p>

<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/oslabs-beta/MediQL/readme/client/components/NavBar/mediqlLogo.png" alt="MediQL Logo">
</p>


## **Description**

MediQL is a GraphQL developer tool, built to work on top of GraphiQL, an open-source web-based integrated development environment (IDE). MediQL takes GraphiQL a step further by delivering query response visualization, error indication, and the ability to observe API response statuses and objects which GraphiQL can not.

Currently in Alpha.

## **Installation (part 1)**

1. Fork this repo and clone to local machine.
2. Run `npm i` in both server directory and client directory to install respective dependencies.
3. Create a `.env` file in the server folder, and assign the global environment variable `MONGODB_URI` with your personal MongoDB connection string (personal database connection string).
4. Run npm start dev. 
(**NOTE**: Server will be running on localhost:3003 & Client will be running on localhost:8080)
5. Visit http://localhost:8080/.

You should be able to see GraphiQL's GUI loaded up, however, we will need to integrate and connect your personal GraphQL project with this application before being able to test your multi-layered queries!

Let's install the necessary dependencies into your personal GraphQL project as it will be needing this to create the integrated development environment (ide).

## **Installation (part 2)**

1. As MediQL is built on top of GraphiQL, it is necessary to have GraphiQL and a /graphql server route set up prior to installing MediQL.
2. Run `npm i express-graphql` to install dependency for GraphiQL (Visit https://github.com/graphql/graphiql for more information)
3. Run `npm i mediql` to install dependency for MediQL (Visit https://github.com/MediQL/mediql-npm-package for more information)

Now, let's move on to configuring your personal GraphQL project and integrate it with MediQL!

## **Usage**

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


## **Features**

### :sparkles: GraphiQL :sparkles: 

GraphiQL's user interface & functionality is provided for testing GraphQL queries alongside our visualizer extension, making a completely integrated development environment for developers. Plug in your GraphQL project's server PORT and get querying!

<p align="center">
  <img width="800" src=https://github.com/MediQL/mediql-images/blob/main/Gifs/inputport.gif> <br>
</p>


### :sparkles: Query Response Visualization & Error Indication :sparkles: 

When a GraphQL query has been made, MediQL visualizes the query response with as a tree of nodes on the right side of your screen. Errors are indicated in red. Possible errors or null values are indicated in orange. Lastly, completed queries with no issues are indicated in green.

<p align="center">
  <img width="800" src=https://github.com/MediQL/mediql-images/blob/main/Gifs/treerender.gif> <br>
</p>

### :sparkles: API Response Transparency :sparkles: 

As we all know, GraphQL responses do not provide API Response Transparency. If a field is not available, the developer ends up with a null value, with no indication of what type of API error was given originally. The  developer would be at risk of the ambiguity of errors. 

This is where MediQL comes in and saves the day!

Each node in the visualizer is clickable and provides insight on that specific resolver's query response! The original API response's status codes and objects are provided to you with no additional call to the external API's. The developer has the ability to look into the original API's response object as well. 

<p align="center">
  <img width="800" src=https://github.com/MediQL/mediql-images/blob/main/Gifs/nodes.gif> <br>
</p>

### :sparkles: Light/Dark Theme :sparkles: 

We also offer a light and dark theme that is integrated with GraphiQL's user interface which allows users to customize their experience and choose the visual style that best suits their preferences and needs.

<p align="center">
  <img width="800" src=https://github.com/MediQL/mediql-images/blob/main/Gifs/lightdarkmode.gif> <br>
</p>

## **Tech Stack**

<table>
  <tr>
    <td align="center">
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png" alt="JavaScript" width="auto" height="50"/>
      </a>
      <br>JavaScript
    </td>
    <td align="center">
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.jsdelivr.net/npm/programming-languages-logos/src/typescript/typescript.png" alt="TypeScript" width="auto" height="50"/>
      </a>
      <br>TypeScript
    </td>
    <td align="center">
      <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/nodejs.jpg" alt="Node.js" width="auto" height="50"/>
      </a>
      <br>Node.js
    </td>
        <td align="center">
      <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/express-logo.jpg" alt="ExpressJS" width="auto" height="50"/>
      </a>
      <br>ExpressJS
    </td>
    <td align="center">
      <a href="https://d3js.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/d3.jpg" alt="D3" width="auto" height="50"/>
      </a>
      <br>D3
    </td>
    <td align="center">
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/react.jpg" alt="React" width="auto" height="50"/>
      </a>
      <br>React
    </td>
    <td align="center">
      <a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/graphql.jpg" alt="GraphQL" width="auto" height="50"/>
      </a>
      <br>GraphQL
    </td>
    <td align="center">
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/next-js.jpg" alt="NextJS" width="auto" height="50"/>
      </a>
      <br>NextJS
    </td>
    <td align="center">
      <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/sass.jpg" alt="NextJS" width="auto" height="50"/>
      </a>
      <br>Sass
    </td>
    <td align="center">
      <a href="https://socket.io/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/socket-io.jpg" alt="Socket.IO" width="auto" height="50"/>
      </a>
      <br>Socket.IO
    </td>
        <td align="center">
      <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/MediQL/mediql-images/blob/main/Tech%20Images/tailwindcss.jpg" alt="tailwind" width="auto" height="50"/>
      </a>
      <br>tailwind
    </td>
  </tr>
</table>

## **Read More**

[Read] (https://medium.com/@noahtofte/364ff07bed34) more about the importance of error transparency!

## **Co-Creators**

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


## **Acknowledgements**

This project uses GraphiQL, an in-browser IDE for exploring GraphQL APIs. GraphiQL is a powerful tool for testing and debugging GraphQL queries, and it has been instrumental in the development of this project.

In addition, our team has developed an extension for GraphiQL that adds a response visualizer and error indicator, which enhances its functionality and makes it even more useful for developers. We would like to thank the creators of GraphiQL for providing a solid foundation for our extension, and for inspiring us to build upon its features.

We also want to thank our team for their hard work and dedication in developing the extension and making it available to the community. We hope that our extension will be helpful to other developers who are using GraphiQL to explore and test their GraphQL APIs.

## **Contributing**

Thank you for your interest in contributing to our project! We welcome contributions from developers, designers, testers, and other contributors who share our passion for building great software.

### Prerequisites

Before you start contributing, you should have knowledge of HTML, CSS, and JavaScript, as well as experience with Git and GitHub. Familiarity with React and GraphQL is also a plus.

### Guidelines

To contribute to our project, please follow these guidelines:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your changes and make your changes.
3. Submit a pull request to our repository and describe your changes in detail.
4. Wait for a code review and address any feedback from our team.
5. Once your changes have been approved, we will merge your pull request into our repository.

If you need help getting started or have any questions, please reach out to us on our GitHub repository.

### Code of conduct

We expect all contributors to follow our code of conduct, which is based on the Contributor Covenant (http://contributor-covenant.org). This code of conduct outlines our expectations for behavior and communication among contributors and helps to create a respectful and inclusive community for everyone.

### Attribution

We would like to acknowledge and give credit to all contributors who have contributed to our project, including code, documentation, and other contributions. Thank you for helping us to make our project better for everyone!

## **Roadmap**

- [x] Implement support for multiple GraphQL APIs.
- [ ] Refactor the codebase to improve maintainability.
- [ ] Deploy the application as a website so that developers can use it without cloning the repo.


