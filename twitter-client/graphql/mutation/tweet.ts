import { graphql } from "../../gql";

export const createTweetMutation = graphql(`
  #grapql

  mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);
