import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from '@apollo/client'
import { UserTypeGQL, CartItemTypeFields } from "@/src/utils/apollo.utils";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/src/utils/firebase.utils";
import { CartItemType } from "@/src/types";
import { addItemToCart, clearItemInCart, subtractItemInCart } from "@/src/utils/cart.utils";
import { Resolvers } from "resolvers-types";
import { readFileSync } from "fs";

const typeDefs = readFileSync('./src/gql/schema.graphql', 'utf8');

const resolvers: Resolvers = {
  Query: {
    currentCart: async (_, { uid }) => {
      const cartSnapShot = await getDoc( doc( db, 'cart', uid ) );
      const currCartArray = cartSnapShot.data()?.cart as CartItemType[];
      return currCartArray;
    },
    sumOfItems: async (_, { uid }) => {
      const cartSnapShot = await getDoc( doc( db, 'cart', uid ) );
      const currCartArray = cartSnapShot.data()?.cart as CartItemType[];
      return currCartArray.reduce( (sum, curr) => ( sum + curr.qty), 0)
    },
    currentCartAndTotal: async (_, { uid }) => {
      const cartSnapShot = await getDoc( doc( db, 'cart', uid ) );
      const currCartArray = cartSnapShot.data()?.cart as CartItemType[];
      const total = currCartArray.reduce( (total, curr) => ( total + curr.qty*curr.price), 0);
      return {
        cart: currCartArray,
        total: total as number
      }
    }
  },
  Mutation: {
    addItem: async (_, { uid, newItem, inCart }) => {
      const cartSnapShot = await getDoc( doc( db, 'cart', uid ) );
      const currCartArray = cartSnapShot.data()?.cart as CartItemType[];
      const newCartArray = addItemToCart(currCartArray, newItem, inCart);
      await setDoc( doc(db, 'cart', uid), {
        cart: newCartArray
      })
      return 'OK'
    },
    subtractQty: async (_, {uid, targetItem }) => {
      const cartSnapShot = await getDoc( doc( db, 'cart', uid ) );
      const currCartArray = cartSnapShot.data()?.cart as CartItemType[];
      const newCartArray = subtractItemInCart(currCartArray, targetItem );
      await setDoc( doc(db, 'cart', uid), {
        cart: newCartArray
      })
      return 'OK'
    },
    deleteItem: async (_, {uid, targetItem}) => {
      const cartSnapShot = await getDoc( doc( db, 'cart', uid ) );
      const currCartArray = cartSnapShot.data()?.cart as CartItemType[];
      const newCartArray = clearItemInCart(currCartArray, targetItem );
      await setDoc( doc(db, 'cart', uid), {
        cart: newCartArray
      })
      return 'OK'
    }
  }
}
// const typeDefs = gql`
//   ${UserTypeGQL}
//   type CartItemType {
//     ${CartItemTypeFields}
//   }
//   type CartItemAndTotalType {
//     cart: [CartItemType]!
//     total: Int!
//   }
//   input CartItemInput {
//     ${CartItemTypeFields}
//   }
//   type Query {
//     currentCart (uid: String!): [CartItemType]
//     currentCartAndTotal (uid: String!): CartItemAndTotalType
//     sumOfItems (uid: String!): Int
//     totalPrice (uid: String!): Int
//   }
//   type Mutation {
//     addItem (uid: String!, newItem: CartItemInput!, inCart: Boolean!): String
//     subtractQty (uid: String!, targetItem: CartItemInput! ): String
//     deleteItem (uid: String!, targetItem: CartItemInput!): String
//   }
// `;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req,res) => ({ req, res })
});
