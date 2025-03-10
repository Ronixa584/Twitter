import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user";
import { Tweet } from "./tweet/index";
import {  Like } from "./like"
import cors from 'cors';
import { GraphqlContext } from "../interfaces";
import JWTService from "./services/jwt";

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  const graphqlServer = new ApolloServer < GraphqlContext >({
    typeDefs: `
        ${User.types}
        ${Tweet.types}
        ${Like.types}

        type Query{
          ${User.queries}
          ${Tweet.queries}
          ${Like.queries}
        }

        type Mutation{
          ${Tweet.mutations}
          ${User.mutations}
          ${Like.mutations}
        }

      `,
    resolvers: {
      Query: {
            ...User.resolvers.queries,
            ...Tweet.resolvers.queries,
            ...Like.resolvers.queries,
      },
      Mutation: {
        ...Tweet.resolvers.mutations,
        ...User.resolvers.mutations,
        ...Like.resolvers.mutations,
      },
      ...Tweet.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers,
      ...Like.resolvers.extraResolvers,
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer, {
    
    context: async ({ req, res }) => {
      return {
        user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1]) : null,
      };
    },
  }));

  return app;
}
