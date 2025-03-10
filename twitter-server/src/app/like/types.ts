export const types = `#graphql
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