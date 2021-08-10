import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import fetch from "node-fetch";
const initApollo = ({ uri, headers }) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({ headers });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri,
    fetch,

    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
  });

  return new ApolloClient({
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
      watchQuery: {
        fetchPolicy: "no-cache",
      },
    },
    link: ApolloLink.from([authMiddleware, httpLink]),
    cache: new InMemoryCache().restore({}),
  });
};

export const createClient = ({
  endpoint,
  secret,
}: {
  endpoint: string;
  secret: string;
}) => {
  return initApollo({
    uri: endpoint,
    headers: {
      "x-hasura-admin-secret": secret,
    },
  });
};
