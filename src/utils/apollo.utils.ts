import { ApolloClient, InMemoryCache, ApolloLink, from, HttpLink, gql } from "@apollo/client";

// this works - printed the request body
// const logLink = new ApolloLink((operation, forward) => {
//     console.info('request', operation.getContext());
//     return forward(operation).map((result) => {
//         console.info('response', operation.getContext());
//         return result;
//     });
// });
const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  // link: ApolloLink.from([responseLogger, new HttpLink({ uri: 'http://localhost:3000/api/graphql'})])
  // link: ApolloLink.from([apolloLogger, new HttpLink({ uri: 'http://localhost:3000/api/graphql'})])
})

export const UserType = gql`
  type User {
    id: Int
    name: String
    email: String
  }
`
export default client