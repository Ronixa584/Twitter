import { graphql } from "@/gql";


export const followUserMutation = graphql(`
  #grapgql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);

export const unfollowUserMutation = graphql(`
  #grapgql
  mutation UnfollowUser($to: ID!) {
  unfollowUser(to: $to)
}
`);