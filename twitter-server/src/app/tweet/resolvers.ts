import { GraphqlContext } from "../../interfaces";
import { Tweet } from "@prisma/client";
import UserService from "../services/user";
import TweetService, { CreateTweetPayload } from "../services/tweet";

const serviceAccount = require("../../../twitter-cb8e7-firebase-adminsdk-smhkw-1a6c1bd2b4.json");
const firebaseAdmin = require("firebase-admin");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.GCP_BUCKET_NAME,//NN
});

const storageRef = admin.storage().bucket(process.env.GCP_BUCKET_NAME);

const queries = {
  getAllTweets: () => TweetService.getAllTweets(),

  getSignedURLForTweet: async (
    parent: any,
    { imageType, imageName }: { imageType: string; imageName: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");

    // const allowedImageTypes = [
    //   "image/jpg",
    //   "image/jpeg",
    //   "image/png",
    //   "image/webp",
    // ]

    // if (!allowedImageTypes.includes(imageType)) throw new Error("Unsupported Image Format");

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
    const tweet = await TweetService.createTweet({ ...payload, userId: ctx.user.id });
    return tweet;
  },
};

//This resolver is used to get nested object named as author info
const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) =>
      UserService.getUserByID(parent.authorId),
  },
};

export const resolvers = { mutations,extraResolvers, queries };