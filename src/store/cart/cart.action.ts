import { CartItemType } from '../../types';
import { SET_CART_ITEMS } from './cart.reducer';
import produce from 'immer';
import { selectCartItems } from './cart.selector';
import { WritableDraft } from 'immer/dist/internal';
// import _ from 'lodash';

// helper function to change quantity
// const changeQty = (
//   cartItems: CartItem[],
//   targetProductOrItem: CartItem | Product,
//   operation: 'add' | 'deduct'
// ) => {
//   if (operation === 'add') {
//     return cartItems.map((cartItem) =>
//       cartItem.id === targetProductOrItem.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
//     );
//   } else {
//     return cartItems.map((cartItem) =>
//       cartItem.id === targetProductOrItem.id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
//     );
//   }
// };

// helper function to "addItemToCart"
// const addCartItem = (cartItems: CartItem[], productToAdd: Product) => {
//   const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

//   return existingCartItem
//     ? changeQty(cartItems, productToAdd, 'add')
//     : [...cartItems, { ...productToAdd, qty: 1 }];
// };
// helper functoin to "removeItemFromCart"
// const removeCartItem = (cartItems: CartItem[], itemToRemove: CartItem) => {
//   const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

//   return existingCartItem?.qty === 1
//     ? clearCartItem(cartItems, itemToRemove)
//     : changeQty(cartItems, itemToRemove, 'deduct');
// };
// helper function to "removeItemInCart"
// const clearCartItem = (cartItems: CartItem[], itemToClear: CartItem) =>
//   cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);

// export const addItemToCart = (cartItems: CartItem[], productToAdd: Product) => {
//   const newCartItems = addCartItem(cartItems, productToAdd);
//   return SET_CART_ITEMS(newCartItems);
// };
// export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
//   const newCartItems = removeCartItem(cartItems, itemToRemove);
//   return SET_CART_ITEMS(newCartItems);
// };
// export const clearItemInCart = (cartItems: CartItem[], itemToClear: CartItem) => {
//   const newCartItems = clearCartItem(cartItems, itemToClear);
//   return SET_CART_ITEMS(newCartItems);
// };

const indexInCart = (draft: WritableDraft<CartItemType[]>, itemToChange: CartItemType) => {
  const index = draft.findIndex((existItem) => {
    return existItem.sku == itemToChange.sku
      ? existItem.color == itemToChange.color
        ? existItem.size == itemToChange.size
          ? true
          : false
        : false
      : false;
  });
  return index;
};
export const addItemToCart = (
  cartItems: CartItemType[],
  newItem: CartItemType,
  inCart: boolean
) => {
  const newState = produce(cartItems, (draft) => {
    const index = indexInCart(draft, newItem);
    if (index == -1) {
      draft.push(newItem);
    } else if (inCart == true) {
      draft[index].qty += 1;
    } else {
      draft[index].qty += newItem.qty;
    }
  });
  return SET_CART_ITEMS(newState);
};

export const subtractItemInCart = (cartItems: CartItemType[], itemToSubtract: CartItemType) => {
  const newState = produce(cartItems, (draft) => {
    const index = indexInCart(draft, itemToSubtract);
    draft[index].qty > 1 ? (draft[index].qty -= 1) : draft.splice(index, 1);
  });
  return SET_CART_ITEMS(newState);
};

export const clearItemInCart = (cartItems: CartItemType[], itemToClear: CartItemType) => {
  const newState = produce(cartItems, (draft) => {
    draft.splice(indexInCart(draft, itemToClear), 1);
  });
  return SET_CART_ITEMS(newState);
};
