import { createSelector } from '@reduxjs/toolkit';
import { BaseState } from '../../types';

const selectCartReducer = (grandState: BaseState) => grandState.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.itemsInCart
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartSlice) =>
  cartSlice.reduce((sum, cartItem) => sum + cartItem.qty, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartSlice) =>
  cartSlice.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0)
);
