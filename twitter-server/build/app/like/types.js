"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
input LikeTweetInput {
  userId: ID!
  tweetId: ID!
}
  
type Like {
  id: ID!
  user: User!
  tweet: Tweet!
  createdAt: String!
}
`;
