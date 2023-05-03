import { CartItemType } from '../../types';
import { SET_CART_ITEMS } from './cart.reducer';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

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

export const emptyItemInCart = (cartItems: CartItemType[]) => {
  const newState = produce(cartItems, (draft) => {
    draft.length = 0;
    // draft.splice(0, draft.length);
  });
  return SET_CART_ITEMS(newState);
};
