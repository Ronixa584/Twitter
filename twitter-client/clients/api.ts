import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== "undefined";//For saftey purpose or to handle unexpected results

export const graphqlClient = new GraphQLClient("http://localhost:8000/graphql", {
    headers: () => ({
        Authorization: isClient ? `Bearer ${window.localStorage.getItem("TWITTER_TOKEN")}` : ``
    }),
});