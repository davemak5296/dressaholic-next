/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CartItemAndTotalType = {
  __typename?: 'CartItemAndTotalType';
  cart: Array<Maybe<CartItemType>>;
  total: Scalars['Int'];
};

export type CartItemInput = {
  brand: Scalars['String'];
  color: Scalars['String'];
  displayName: Scalars['String'];
  imageUrl: Scalars['String'];
  price: Scalars['Int'];
  qty: Scalars['Int'];
  size: Scalars['String'];
  sku: Scalars['String'];
};

export type CartItemType = {
  __typename?: 'CartItemType';
  brand: Scalars['String'];
  color: Scalars['String'];
  displayName: Scalars['String'];
  imageUrl: Scalars['String'];
  price: Scalars['Int'];
  qty: Scalars['Int'];
  size: Scalars['String'];
  sku: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem: Scalars['String'];
  deleteItem: Scalars['String'];
  subtractQty: Scalars['String'];
};


export type MutationAddItemArgs = {
  inCart: Scalars['Boolean'];
  newItem: CartItemInput;
  uid: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  targetItem: CartItemInput;
  uid: Scalars['String'];
};


export type MutationSubtractQtyArgs = {
  targetItem: CartItemInput;
  uid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentCart: Array<Maybe<CartItemType>>;
  currentCartAndTotal: CartItemAndTotalType;
  sumOfItems: Scalars['Int'];
  totalPrice: Scalars['Int'];
};


export type QueryCurrentCartArgs = {
  uid: Scalars['String'];
};


export type QueryCurrentCartAndTotalArgs = {
  uid: Scalars['String'];
};


export type QuerySumOfItemsArgs = {
  uid: Scalars['String'];
};


export type QueryTotalPriceArgs = {
  uid: Scalars['String'];
};

export type AddItemMutationVariables = Exact<{
  uid: Scalars['String'];
  newItem: CartItemInput;
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: string };

export type GetCurrentCartQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetCurrentCartQuery = { __typename?: 'Query', currentCart: Array<{ __typename?: 'CartItemType', sku: string, brand: string, displayName: string, imageUrl: string, price: number, color: string, size: string, qty: number } | null> };

export type GetSumOfItemsQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetSumOfItemsQuery = { __typename?: 'Query', sumOfItems: number };

export type DeleteItemMutationVariables = Exact<{
  uid: Scalars['String'];
  targetItem: CartItemInput;
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: string };

export type SubtractItemMutationVariables = Exact<{
  uid: Scalars['String'];
  targetItem: CartItemInput;
}>;


export type SubtractItemMutation = { __typename?: 'Mutation', subtractQty: string };

export type GetCurrentCartAndTotalQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetCurrentCartAndTotalQuery = { __typename?: 'Query', currentCartAndTotal: { __typename?: 'CartItemAndTotalType', total: number, cart: Array<{ __typename?: 'CartItemType', sku: string, brand: string, displayName: string, imageUrl: string, price: number, color: string, size: string, qty: number } | null> } };


export const AddItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"newItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newItem"}}},{"kind":"Argument","name":{"kind":"Name","value":"inCart"},"value":{"kind":"BooleanValue","value":true}}]}]}}]} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;
export const GetCurrentCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"qty"}}]}}]}}]} as unknown as DocumentNode<GetCurrentCartQuery, GetCurrentCartQueryVariables>;
export const GetSumOfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSumOfItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sumOfItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]} as unknown as DocumentNode<GetSumOfItemsQuery, GetSumOfItemsQueryVariables>;
export const DeleteItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetItem"}}}]}]}}]} as unknown as DocumentNode<DeleteItemMutation, DeleteItemMutationVariables>;
export const SubtractItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubtractItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtractQty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetItem"}}}]}]}}]} as unknown as DocumentNode<SubtractItemMutation, SubtractItemMutationVariables>;
export const GetCurrentCartAndTotalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentCartAndTotal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentCartAndTotal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"qty"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetCurrentCartAndTotalQuery, GetCurrentCartAndTotalQueryVariables>;