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
const user_1 = __importDefault(require("../services/user"));
const tweet_1 = __importDefault(require("../services/tweet"));
const serviceAccount = require("../../../twitter-cb8e7-firebase-adminsdk-smhkw-1a6c1bd2b4.json");
const firebaseAdmin = require("firebase-admin");
const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: process.env.GCP_BUCKET_NAME, //NN
});
const storageRef = admin.storage().bucket(process.env.GCP_BUCKET_NAME);
const queries = {
    getAllTweets: () => tweet_1.default.getAllTweets(),
    getSignedURLForTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { imageType, imageName }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("Unauthenticated");
        // const allowedImageTypes = [
        //   "image/jpg",
        //   "image/jpeg",
        //   "image/png",
        //   "image/webp",
        // ]
        // if (!allowedImageTypes.includes(imageType)) throw new Error("Unsupported Image Format");
        // Upload the File
        const file = storageRef.file(`uploads/twitter/${imageName}-${Date.now()}.${imageType}`);
        const [url] = yield file.getSignedUrl({
            action: "write",
            method: 'PUT',
            expires: Date.now() + 60 * 60 * 1000, // 1 hour expiration
            contentType: `image/${imageType}`,
        });
        return url;
    }),
};
const mutations = {
    createTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        const tweet = yield tweet_1.default.createTweet(Object.assign(Object.assign({}, payload), { userId: ctx.user.id }));
        return tweet;
    }),
};
//This resolver is used to get nested object named as author info
const extraResolvers = {
    Tweet: {
        author: (parent) => user_1.default.getUserByID(parent.authorId),
    },
};
exports.resolvers = { mutations, extraResolvers, queries };
