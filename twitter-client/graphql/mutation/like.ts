import { graphql } from "../../gql";

export const createLikeMutation = graphql(`
  #grapql

  mutation LikeTweet($input: LikeTweetInput!) {
    likeTweet(input: $input) {
      id
    }
  }
`);

export const createUnLikeMutation = graphql(`
  #grapql

  mutation UnlikeTweet($input: LikeTweetInput!) {
    unlikeTweet(input: $input)
  }
`);







