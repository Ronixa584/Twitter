"use client";

import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "./../clients/api";
import { createLikeMutation, createUnLikeMutation } from "@/graphql/mutation/like";
import {
  hasUserLikedQuery,
  getLikeCountForTweetQuery,
} from "@/graphql/query/like";
import toast from "react-hot-toast";
import { LikeTweetInput} from "@/gql/graphql";

export const useLikeTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: LikeTweetInput) =>
      graphqlClient.request(createLikeMutation, { input }),
    onMutate: (payload) => {
      // toast.loading("Liking tweet...", { id: "1" });
    },
    onSuccess: async (payload) => {
      if (payload === null) {
        // User has already liked the tweet
          toast.dismiss("1"); // Dismiss the loading toast
          return;
      }
      // Invalidate the "all-tweets" query to refetch the updated list of tweets
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });

      // Invalidate the "likes" query to refetch the likes for the specific tweet
      await queryClient.invalidateQueries({ queryKey: ["likes"] });

      // Update the toast message
      // toast.success("Tweet liked successfully", { id: "1" });
    },
    onError: (error) => {
      toast.error("Failed to like tweet", { id: "1" });
    },
  });

  return mutation;
};

export const useUnlikeTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: LikeTweetInput) =>
      graphqlClient.request(createUnLikeMutation, { input }),
    onMutate: (payload) => {
      // toast.loading("Unliking tweet...", { id: "2" }); // Use a different toast ID
    },
    onSuccess: async (payload) => {
      // Invalidate the "all-tweets" query to refetch the updated list of tweets
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });

      // Invalidate the "likes" query to refetch the likes for the specific tweet
      await queryClient.invalidateQueries({ queryKey: ["likes"] });

      // Update the toast message
      // toast.success("Tweet unliked successfully", { id: "2" });
    },
    onError: (error) => {
      toast.error("Failed to unlike tweet", { id: "2" });
    },
  });

  return mutation;
};

// export const hasUserLikedTweets = () => {
//   const query = useQuery({
//     queryKey: ["hasUserLikedTweet"],
//     queryFn: () => graphqlClient.request(hasUserLikedQuery),
//   });

//   return { ...query, };
// }
export const useHasUserLikedTweet = (input: LikeTweetInput) => {
  const query = useQuery({
    queryKey: ["hasUserLikedTweet", input.tweetId, input.userId], // Unique key for each tweet-user pair
    queryFn: () => graphqlClient.request(hasUserLikedQuery, { input }), // Pass the input to the query
  });

  return query.data?.hasUserLikedTweet || false;
};

export const useGetLikeCountForTweet = (input: LikeTweetInput) => {
  const query = useQuery({
    queryKey: ["getLikeCountForTweet", input.tweetId], // Unique key for each tweet
    queryFn: () => graphqlClient.request(getLikeCountForTweetQuery, { input }), // Pass the input to the query
    enabled: !!input.tweetId, // Only run the query if tweetId is provided
  });

  return query.data?.getLikeCountForTweet || 0; // Default to 0 if data is undefined
};