import LikeService, { LikeTweetPayload } from "../services/like";
import { GraphqlContext } from "../../interfaces";
import UserService from "../services/user";
import TweetService from "../services/tweet";

const queries = {
  getAllLikesForTweet: async (
    parent: any,
    { input }: { input: LikeTweetPayload }
  ) => {
    return await LikeService.getAllLikesForTweet({ ...input });
  },
  hasUserLikedTweet: async (
    parent: any,
    { input }: { input: LikeTweetPayload }
  ) => {
    return await LikeService.hasUserLikedTweet({ ...input });
  },
  getLikeCountForTweet: async (
    parent: any,
    {input} : {input: LikeTweetPayload}
  ) => {
    return await LikeService.getLikeCountForTweet({ ...input });
  }
};

const mutations = {
  likeTweet: async (
    parent: any,
    { input }: { input: LikeTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    // console.log(ctx.user.id + " " + input);

    const likeStatus = await LikeService.hasUserLikedTweet({ ...input });
    if (likeStatus == true) {
      return null;
      // throw new Error("You have already liked this tweet");
    } else {
      const like = await LikeService.likeTweet({
        ...input,
        userId: ctx.user.id,
      });

      return like;
    }
  },

  unlikeTweet: async (
    parent: any,
    { input }: { input: LikeTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    await LikeService.unlikeTweet({...input, userId: ctx.user.id });
    return true;
  },
};

const extraResolvers = {
  Like: {
    user: (parent: any) => UserService.getUserByID(parent.userId), // Required if `user` is non-nullable
    tweet: (parent: any) => TweetService.getTweetByID(parent.tweetId), // Required if `tweet` is non-nullable
  },
};
//The user resolver is required to fetch the User object associated with the Like. In your Prisma schema, the Like model has a userId field, which is a foreign key to the User model. The resolver uses this userId to fetch the corresponding User object.

export const resolvers = { mutations, extraResolvers, queries};