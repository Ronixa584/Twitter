export const queries = `#graphql
    getAllLikesForTweet(input: LikeTweetInput!): [Like]
    hasUserLikedTweet(input: LikeTweetInput!): Boolean!
    getLikeCountForTweet(input: LikeTweetInput!): Int!
`;