"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
class LikeService {
    // Like a tweet
    static likeTweet(data) {
        // console.log(data.tweetId)
        return db_1.prismaClient.like.create({
            data: {
                userId: data.userId,
                tweetId: data.tweetId,
            },
        });
    }
    // Unlike a tweet
    static unlikeTweet(data) {
        return db_1.prismaClient.like.delete({
            where: {
                userId_tweetId: {
                    userId: data.userId,
                    tweetId: data.tweetId,
                },
            },
        });
    }
    // Get all likes for a tweet
    static getAllLikesForTweet(data) {
        const tweetId = data.tweetId;
        console.log(tweetId);
        return db_1.prismaClient.like.findMany({
            where: { tweetId },
            include: { user: true }, // Include user details for each like
        });
    }
    // Check if a user has liked a tweet
    static hasUserLikedTweet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield db_1.prismaClient.like.findUnique({
                where: {
                    userId_tweetId: {
                        userId: data.userId,
                        tweetId: data.tweetId,
                    },
                },
            });
            return !!like; // Returns true if the like exists, otherwise false
        });
    }
}
exports.default = LikeService;
