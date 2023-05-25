import { useMutation } from "@apollo/client";
import Image from "next/image";

import { graphql } from '@/src/gql';
import PlusSign from '@/assets/icons-and-logos/circle-plus-solid.svg';
import { GET_CART_ITEM } from "./Cart-dropdown";
import { GET_SUMOFITEM } from "./Cart-icon";
import { CartItemType } from "@/src/types";
import { GET_CART_AND_TOTAL } from "pages/cart";

const ADD_ITEM = graphql(`
  mutation AddItem ($uid: String!, $newItem: CartItemInput!) {
    addItem (uid: $uid, newItem: $newItem, inCart: true)
  }
`)

type AddButtonProps = {
  uid: string;
  item: CartItemType;
}

const AddButton = ({uid, item}: AddButtonProps) => {
  const [ addQty ] = useMutation(ADD_ITEM);

  return (
  <Image
    src={PlusSign}
    onClick={() => addQty({
      variables: {
        uid: uid,
        newItem: item
      },
      refetchQueries: [
        // GET_CART_ITEM, GET_SUMOFITEM, GET_CART_AND_TOTAL
        'GetCurrentCart', 'GetSumOfItems', 'GetCurrentCartAndTotal'
      ]
    })}
    onKeyDown={e => {
      if (e.key === 'Enter') {
        addQty({
          variables: {
            uid: uid,
            newItem: item
          },
          refetchQueries: [
            // GET_CART_ITEM, GET_SUMOFITEM, GET_CART_AND_TOTAL
            'GetCurrentCart', 'GetSumOfItems', 'GetCurrentCartAndTotal'
          ]
        })
      }
    }}
    className='ml-1 h-4 w-4 cursor-pointer'
    alt='plus-sign'
    tabIndex={0}
  />
  )
}
export default AddButton;