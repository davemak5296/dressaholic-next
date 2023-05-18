/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddItem ($uid: String!, $newItem: CartItemInput!) {\n    addItem (uid: $uid, newItem: $newItem, inCart: true)\n  }\n": types.AddItemDocument,
    "\n  query GetCurrentCart($uid: String!) {\n    currentCart(uid: $uid) {\n      sku\n      brand\n      displayName\n      imageUrl\n      price\n      color\n      size\n      qty\n    }\n  }\n": types.GetCurrentCartDocument,
    "\n  query GetSumOfItems($uid: String!) {\n    sumOfItems(uid: $uid)\n  }\n": types.GetSumOfItemsDocument,
    "\n  mutation DeleteItem ($uid: String!, $targetItem: CartItemInput!) {\n    deleteItem (uid: $uid, targetItem: $targetItem)\n  }\n": types.DeleteItemDocument,
    "\n  mutation SubtractItem ($uid: String!, $targetItem: CartItemInput!) {\n    subtractQty (uid: $uid, targetItem: $targetItem)\n  }\n": types.SubtractItemDocument,
    "\n  query GetCurrentCartAndTotal($uid: String!) {\n    currentCartAndTotal(uid: $uid) {\n      cart {\n        sku\n        brand\n        displayName\n        imageUrl\n        price\n        color\n        size\n        qty\n      }\n      total\n    }\n  }\n": types.GetCurrentCartAndTotalDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddItem ($uid: String!, $newItem: CartItemInput!) {\n    addItem (uid: $uid, newItem: $newItem, inCart: true)\n  }\n"): (typeof documents)["\n  mutation AddItem ($uid: String!, $newItem: CartItemInput!) {\n    addItem (uid: $uid, newItem: $newItem, inCart: true)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentCart($uid: String!) {\n    currentCart(uid: $uid) {\n      sku\n      brand\n      displayName\n      imageUrl\n      price\n      color\n      size\n      qty\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentCart($uid: String!) {\n    currentCart(uid: $uid) {\n      sku\n      brand\n      displayName\n      imageUrl\n      price\n      color\n      size\n      qty\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSumOfItems($uid: String!) {\n    sumOfItems(uid: $uid)\n  }\n"): (typeof documents)["\n  query GetSumOfItems($uid: String!) {\n    sumOfItems(uid: $uid)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteItem ($uid: String!, $targetItem: CartItemInput!) {\n    deleteItem (uid: $uid, targetItem: $targetItem)\n  }\n"): (typeof documents)["\n  mutation DeleteItem ($uid: String!, $targetItem: CartItemInput!) {\n    deleteItem (uid: $uid, targetItem: $targetItem)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SubtractItem ($uid: String!, $targetItem: CartItemInput!) {\n    subtractQty (uid: $uid, targetItem: $targetItem)\n  }\n"): (typeof documents)["\n  mutation SubtractItem ($uid: String!, $targetItem: CartItemInput!) {\n    subtractQty (uid: $uid, targetItem: $targetItem)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentCartAndTotal($uid: String!) {\n    currentCartAndTotal(uid: $uid) {\n      cart {\n        sku\n        brand\n        displayName\n        imageUrl\n        price\n        color\n        size\n        qty\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentCartAndTotal($uid: String!) {\n    currentCartAndTotal(uid: $uid) {\n      cart {\n        sku\n        brand\n        displayName\n        imageUrl\n        price\n        color\n        size\n        qty\n      }\n      total\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;