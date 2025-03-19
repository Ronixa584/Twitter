"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getAllLikesForTweet(input: LikeTweetInput!): [Like]
    hasUserLikedTweet(input: LikeTweetInput!): Boolean!
    getLikeCountForTweet(input: LikeTweetInput!): Int!
`;
