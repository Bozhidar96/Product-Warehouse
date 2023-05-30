const express = require("express");
import { ApolloServer } from "apollo-server-express";
import resolvers from "./src/graphql/resolvers/resolvers";
import { typeDefs } from "./src/graphql/typeDefs";

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  console.error("Error when starting the server: ", error);
});
