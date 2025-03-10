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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const like_1 = __importDefault(require("../services/like"));
const user_1 = __importDefault(require("../services/user"));
const tweet_1 = __importDefault(require("../services/tweet"));
const queries = {
    getAllLikesForTweet: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { input }) {
        return yield like_1.default.getAllLikesForTweet(Object.assign({}, input));
    }),
};
const mutations = {
    likeTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { input }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        // console.log(ctx.user.id + " " + input);
        const like = yield like_1.default.likeTweet(Object.assign(Object.assign({}, input), { userId: ctx.user.id }));
        return like;
    }),
    unlikeTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { input }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        yield like_1.default.unlikeTweet(Object.assign(Object.assign({}, input), { userId: ctx.user.id }));
        return true;
    }),
};
const extraResolvers = {
    Like: {
        user: (parent) => user_1.default.getUserByID(parent.userId), // Required if `user` is non-nullable
        tweet: (parent) => tweet_1.default.getTweetByID(parent.tweetId), // Required if `tweet` is non-nullable
    },
};
//The user resolver is required to fetch the User object associated with the Like. In your Prisma schema, the Like model has a userId field, which is a foreign key to the User model. The resolver uses this userId to fetch the corresponding User object.
exports.resolvers = { mutations, extraResolvers, queries };
