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
exports.resolvers = void 0;
const db_1 = require("../clients/db");
const serviceAccount = require("../../../twitter-cb8e7-firebase-adminsdk-smhkw-1a6c1bd2b4.json");
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: "twitter-cb8e7.appspot.com",
});
const storageRef = admin.storage().bucket(`gs://twitter-cb8e7.appspot.com`);
const queries = {
    getAllTweets: () => db_1.prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } }),
    getSignedURLForTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { imageType, imageName }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("Unauthenticated");
        const allowedImageTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];
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
        const tweet = yield db_1.prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user.id } },
            },
        });
        return tweet;
    }),
};
//This resolver is used to get nested object named as author info
const extraResolvers = {
    Tweet: {
        author: (parent) => db_1.prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    },
};
exports.resolvers = { mutations, extraResolvers, queries };
