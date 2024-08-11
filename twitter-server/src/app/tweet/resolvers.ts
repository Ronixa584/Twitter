import { GraphqlContext } from "../../interfaces";
import { prismaClient } from "../clients/db";
// import { Tweet } from "./types";
import { Tweet } from "@prisma/client";

interface CreateTweetPayload{
    content: string;
    imageURL?: string;
}

const queries = {
    getAllTweets: () =>
        prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } }),
};

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: ctx.user.id } },
      },
    });

    return tweet;
  },
};

//This resolver is used to get nested object named as author info
const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) =>
      prismaClient.user.findUnique({ where: { id: parent.authorId } }),
  },
};

export const resolvers = { mutations,extraResolvers, queries };