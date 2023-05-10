# MediQL

# Description
MediQL is a GraphQL developer tool, built to work on top of GraphiQL, an open-source web-based integrated development environment (IDE). MediQL takes GraphiQL a step further by delivering query response visualization, error indication, and the ability to observe API response statuses and objects which GraphiQL can not.

Currently in Alpha.

# Installation (part 1)
1. Fork this repo and clone to local machine.
2. Run `npm i` in both server directory and client directory to install respective dependencies.
3. Create a `.env` file in the server folder, and assign the global environment variable `MONGODB_URI` with your personal MongoDB connection string (personal database connection string).
3. Run npm start dev.
4. Visit http://localhost:8080/.

You should be able to see GraphiQL's GUI loaded up, however, we will need to integrate and connect your personal GraphQL project with this application before being able to test your multi-layered queries!

Let's install the necessary dependencies into your personal GraphQL project as it will be needing this to create the integrated development environment (ide).

# Installation (part 2)
1. As MediQL is built on top of GraphiQL, it is necessary to have GraphiQL and a /graphql server route set up prior to installing MediQL. 
2. Run `npm i express-graphql` to install dependency for GraphiQL (Visit https://github.com/graphql/graphiql for more information)
2. Run `npm i mediql` to install dependency for MediQL (Visit https://github.com/MediQL/mediql-npm-package for more information)

Now, let's move on to configuring your personal GraphQL project and integrate it with MediQL!

# Usage
1. In your GraphQL project, 


# Features
## GraphiQL

## Query Response Visualization & Error Indication

## API Response Transparency

## Light/Dark Theme

# Tech Stack

# Read More

# Co-Creators

# Acknowledgements

# Contributing

# Roadmap