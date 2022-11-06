import { createSlice } from '@reduxjs/toolkit';
import { BaseState, CartItemType } from '../../types';

export const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    isCartOpen: false,
    itemsInCart: [] as CartItemType[],
  } as BaseState['cart'],

  reducers: {
    SET_IS_CART_OPEN: (state: BaseState['cart'], action) => {
      state.isCartOpen = action.payload;
    },
    SET_CART_ITEMS: (state: BaseState['cart'], action) => {
      state.itemsInCart = action.payload;
    },
  },
});

export const { SET_IS_CART_OPEN, SET_CART_ITEMS } = cartSlice.actions;
export default cartSlice.reducer;
