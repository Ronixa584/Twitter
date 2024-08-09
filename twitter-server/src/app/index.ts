import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user";
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

        type Query{
          ${User.queries}
        }

      `,
    resolvers: {
      Query: {
            ...User.resolvers.queries,
      },
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
//Created context so that we can use it anywhere in backend

  return app;
}
