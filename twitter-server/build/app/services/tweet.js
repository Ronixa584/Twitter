"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
class TweetService {
    static createTweet(data) {
        console.log("This is tweet" + data.content);
        return db_1.prismaClient.tweet.create({
            data: {
                content: data.content,
                imageURL: data.imageURL,
                author: { connect: { id: data.userId } },
            },
        });
    }
    static getAllTweets() {
        return db_1.prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });
    }
    static getTweetByID(tweetId) {
        return db_1.prismaClient.tweet.findUnique({
            where: { id: tweetId },
        });
    }
}
exports.default = TweetService;
