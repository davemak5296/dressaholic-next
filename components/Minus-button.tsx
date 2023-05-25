import { useMutation } from "@apollo/client";
import Image from "next/image";
import { graphql } from '@/src/gql';
import MinusSign from '@/assets/icons-and-logos/circle-minus-solid.svg';
import { GET_CART_ITEM } from "./Cart-dropdown";
import { GET_SUMOFITEM } from "./Cart-icon";
import { CartItemType } from "@/src/types";
import { GET_CART_AND_TOTAL } from "pages/cart";

const SUBTRACT_QTY = graphql(`
  mutation SubtractItem ($uid: String!, $targetItem: CartItemInput!) {
    subtractQty (uid: $uid, targetItem: $targetItem)
  }
`)
type MinusButtonProps = {
  uid: string;
  item: CartItemType;
}

const MinusButton = ({uid, item}: MinusButtonProps) => {
  const [ subtract ] = useMutation(SUBTRACT_QTY);

  return (
    <Image
      src={MinusSign}
      onClick={() => subtract({
        variables: {
          uid: uid,
          targetItem: item
        },
        refetchQueries: [
          // GET_CART_ITEM, GET_SUMOFITEM, GET_CART_AND_TOTAL
          'GetCurrentCart', 'GetSumOfItems', 'GetCurrentCartAndTotal'
        ]
      })}
      onKeyDown={e => {
        if (e.key === 'Enter') { 
          subtract({
            variables: {
              uid: uid,
              targetItem: item
            },
            refetchQueries: [
              // GET_CART_ITEM, GET_SUMOFITEM, GET_CART_AND_TOTAL
              'GetCurrentCart', 'GetSumOfItems', 'GetCurrentCartAndTotal'
            ]
          })
        }
      }}
      className='ml-1 h-4 w-4 cursor-pointer'
      alt='minus-sign'
      tabIndex={0}
    />
  )
}
export default MinusButton;