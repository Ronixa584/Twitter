import { GraphqlContext } from "../../interfaces";
import { prismaClient } from "../clients/db";
// import { Tweet } from "./types";
import { Tweet } from "@prisma/client";

const serviceAccount = require("../../../twitter-cb8e7-firebase-adminsdk-smhkw-1a6c1bd2b4.json");

const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "twitter-cb8e7.appspot.com",
});

const storageRef = admin.storage().bucket(`gs://twitter-cb8e7.appspot.com`);


interface CreateTweetPayload{
    content: string;
    imageURL?: string;
}

const queries = {
  getAllTweets: () =>
    prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } }),

  getSignedURLForTweet: async (
    parent: any,
    { imageType, imageName }: { imageType: string; imageName: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");

    const allowedImageTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ]
    
    // Upload the File
     const file = storageRef.file(
       `uploads/twitter/${imageName}-${Date.now()}.${imageType}`
    );
    
     const [url] = await file.getSignedUrl({
       action: "write",
       method: 'PUT',
       expires: Date.now() + 60 * 60 * 1000, // 1 hour expiration
       contentType: `image/${imageType}`,
     });

     return url;

  },
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