import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const uri = process.env.REACT_APP_STORYBLOK_API;
const token = process.env.REACT_APP_STORYBLOK_TOKEN;

const httpLink = new HttpLink({ uri });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token,
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
