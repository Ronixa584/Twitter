"use client";

import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      email
      firstName
      id
      lastName
      profileImageURL
      tweets {
        id
        content
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);
  
export const getUserByIdQuery = graphql(`
  #graphql
  query GetUserById($id: ID!) {  
    getUserById(id: $id) {        
      id
      firstName
      lastName
      email
      profileImageURL
      tweets {
        id
        content
        imageURL
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);
