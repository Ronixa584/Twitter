import { prismaClient } from "../clients/db";

export interface CreateTweetPayload {
  content: string;
    imageURL?: string;
    userId?: string;
}

class TweetService {
  public static createTweet(data: CreateTweetPayload) {
    console.log("This is tweet"+ data.content);
        return prismaClient.tweet.create({
          data: {
            content: data.content,
            imageURL: data.imageURL,
            author: { connect: { id: data.userId } },
          },
        });
    }

    public static getAllTweets() {
        return prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });
  }
  
    public static getTweetByID(tweetId: string){
        return prismaClient.tweet.findUnique({
          where: {id: tweetId},
        })
    }

}

export default TweetService;
