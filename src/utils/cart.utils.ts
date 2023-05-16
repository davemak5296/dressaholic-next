import { CartItemType } from '@/src/types';
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
    inCart
      ? draft[index].qty += 1
      : index == -1
        ? draft.push(newItem)
        : draft[index].qty += newItem.qty
  });

  return newState;
};