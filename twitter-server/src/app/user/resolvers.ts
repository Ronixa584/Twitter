import { prismaClient } from "../clients/db";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";
import UserService from './../services/user';

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const resultToken = await UserService.verifyGoogleAuthToken(token);
    return resultToken;
  },

  //This resolver will return userInfo from the database
  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) return null;
    const user = await UserService.getUserByID(id);
    return user;
  },

  //This resolver will return userInfo of requested user ID
  getUserById: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => { return UserService.getUserByID(id); },

};

//This resolver is used to get nested object named as Tweet info
const extraResolvers = {
  User: {
    tweets: (parent: User) =>
      prismaClient.tweet.findMany({ where: { author: { id: parent.id } } }),
  },
};

export const resolvers = { queries,extraResolvers };