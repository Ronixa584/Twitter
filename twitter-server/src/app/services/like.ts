import { prismaClient } from "../clients/db";

export interface LikeTweetPayload {
  userId: string;
  tweetId: string;
}

class LikeService {
  // Like a tweet
  public static likeTweet(data: LikeTweetPayload) {
    // console.log(data.tweetId)
    return prismaClient.like.create({
      data: {
        userId: data.userId,
        tweetId: data.tweetId,
      },
    });
  }

  // Unlike a tweet
  public static unlikeTweet(data: LikeTweetPayload) {
    return prismaClient.like.delete({
      where: {
        userId_tweetId: {
          userId: data.userId,
          tweetId: data.tweetId,
        },
      },
    });
  }

  // Get all likes for a tweet
  public static getAllLikesForTweet(data: LikeTweetPayload) {
    const tweetId = data.tweetId;
    console.log(tweetId);
    return prismaClient.like.findMany({
      where: { tweetId },
      include: { user: true }, // Include user details for each like
    });
  }

  // Check if a user has liked a tweet
  public static async hasUserLikedTweet(userId: string, tweetId: string) {
    const like = await prismaClient.like.findUnique({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    return !!like; // Returns true if the like exists, otherwise false
  }
}

export default LikeService;
