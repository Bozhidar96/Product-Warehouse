const express = require("express");
import { ApolloServer } from "apollo-server-express";
import resolvers from "./src/database/resolvers";
import { graphType } from "./src/types/types";

const server = new ApolloServer({ typeDefs: graphType, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});
