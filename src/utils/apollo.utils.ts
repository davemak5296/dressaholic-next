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
  // link: ApolloLink.from([logLink, new HttpLink({ uri: 'http://localhost:3000/api/graphql'})])
  // link: ApolloLink.from([responseLogger, new HttpLink({ uri: 'http://localhost:3000/api/graphql'})])
  // link: ApolloLink.from([apolloLogger, new HttpLink({ uri: 'http://localhost:3000/api/graphql'})])
})

export const CartItemTypeFields = `
  sku: String!
  brand: String!
  displayName: String!
  imageUrl: String!
  price: Int!
  color: String!
  size: String!
  qty: Int!
`

export const CartItemFieldNames = `
  sku
  brand
  displayName
  imageUrl
  price
  color
  size
  qty
`
export const UserTypeGQL = gql`
  type User {
    uid: String!
  }
`
export default client