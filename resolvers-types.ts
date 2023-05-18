import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CartItemAndTotalType: ResolverTypeWrapper<CartItemAndTotalType>;
  CartItemInput: CartItemInput;
  CartItemType: ResolverTypeWrapper<CartItemType>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CartItemAndTotalType: CartItemAndTotalType;
  CartItemInput: CartItemInput;
  CartItemType: CartItemType;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
}>;

export type CartItemAndTotalTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartItemAndTotalType'] = ResolversParentTypes['CartItemAndTotalType']> = ResolversObject<{
  cart?: Resolver<Array<Maybe<ResolversTypes['CartItemType']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CartItemTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartItemType'] = ResolversParentTypes['CartItemType']> = ResolversObject<{
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  qty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addItem?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationAddItemArgs, 'inCart' | 'newItem' | 'uid'>>;
  deleteItem?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'targetItem' | 'uid'>>;
  subtractQty?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSubtractQtyArgs, 'targetItem' | 'uid'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentCart?: Resolver<Array<Maybe<ResolversTypes['CartItemType']>>, ParentType, ContextType, RequireFields<QueryCurrentCartArgs, 'uid'>>;
  currentCartAndTotal?: Resolver<ResolversTypes['CartItemAndTotalType'], ParentType, ContextType, RequireFields<QueryCurrentCartAndTotalArgs, 'uid'>>;
  sumOfItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QuerySumOfItemsArgs, 'uid'>>;
  totalPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryTotalPriceArgs, 'uid'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CartItemAndTotalType?: CartItemAndTotalTypeResolvers<ContextType>;
  CartItemType?: CartItemTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

