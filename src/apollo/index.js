import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            errorPolicy: "all",
        },
        query: {
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
    },
});

export default client;