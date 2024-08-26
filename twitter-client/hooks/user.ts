"use client";

import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery,getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"


export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["CURRENT_USER"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery),
    });

    return { ...query, user: query.data?.getCurrentUser };
};

// export const useGetUserInfo = () => {
//     const query = useQuery({
//         queryKey: ["USER_INFO"],
//         queryFn: () => graphqlClient.request(getUserByIdQuery),
//     });

//     return {...query, userProfileInfo: query?.data?.getUserById };
// }

export const useGetUserInfo = (id: string) => {
    const query = useQuery({
        queryKey: ["getUserById", id], // Include id in the query key for caching
        queryFn: () => graphqlClient.request(getUserByIdQuery, { id }), 
        enabled: !!id, 
    });

    return { ...query, userProfileInfo: query?.data?.getUserById };
}