import { graphql } from "../../gql";

export const hasUserLikedQuery = graphql(`
  query Query($input: LikeTweetInput!) {
    hasUserLikedTweet(input: $input)
  }
`);

export const getLikeCountForTweetQuery = graphql(`
  query GetLikeCountForTweet($input: LikeTweetInput!) {
    getLikeCountForTweet(input: $input)
  }
`);