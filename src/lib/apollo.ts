import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// HTTP Link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

// Auth link to add authentication headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth-token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'Content-Type': 'application/json',
    }
  };
});

// Error link to handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // Handle specific network errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // Handle unauthorized errors
      localStorage.removeItem('auth-token');
      // Optionally redirect to login
    }
  }
});

// Configure Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchDocumentation: {
            // Enable pagination for search results
            keyArgs: ['query', 'filters'],
            merge(existing, incoming, { args }) {
              if (!existing || args?.offset === 0) {
                return incoming;
              }
              
              return {
                ...incoming,
                items: [...existing.items, ...incoming.items],
              };
            },
          },
        },
      },
      DocumentationItem: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Helper function to clear cache
export const clearApolloCache = () => {
  apolloClient.clearStore();
};

// Helper function to update auth token
export const updateAuthToken = (token: string) => {
  localStorage.setItem('auth-token', token);
  // Reset the client to use the new token
  apolloClient.resetStore();
};
