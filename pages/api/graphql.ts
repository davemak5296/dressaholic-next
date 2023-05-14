import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from '@apollo/client'
import { UserType } from "@/src/utils/apollo.utils";

const resolvers = {
  Query: {
    user: () => {
      return [ {
          id: 1,
          name: 'John Doe',
          email: 'john@gmail.com'
        } ]
      
    }
  }
}

const typeDefs = gql`
  ${UserType}
  type Query {
    user: [User]
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req,res) => ({ req, res })
});
