"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
    likeTweet(input: LikeTweetInput!): Like
    unlikeTweet(input: LikeTweetInput!): Boolean!
`;
