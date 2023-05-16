import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import MinusSign from '@/assets/icons-and-logos/circle-minus-solid.svg';
import {  } from "./Product";
import { GET_CART_ITEM } from "./Cart-dropdown";
import { GET_SUMOFITEM } from "./Cart-icon";
import { CartItemType } from "@/src/types";

const SUBTRACT_QTY = gql`
  mutation SubtractItem ($uid: String!, $targetItem: CartItemInput!) {
    subtractQty (uid: $uid, targetItem: $targetItem)
  }
`
type MinusButtonProps = {
  uid: string;
  item: CartItemType & { __typename: string};
}

const MinusButton = ({uid, item}: MinusButtonProps) => {
  const { __typename, ...neededFields } = item
  const [ subtract ] = useMutation(SUBTRACT_QTY);

  return <Image src={MinusSign} onClick={() => subtract({
    variables: {
      uid: uid,
      targetItem: {
        ...neededFields,
      }
    },
    refetchQueries: [
      GET_CART_ITEM, GET_SUMOFITEM
    ]
  })} className='ml-1 h-4 w-4 cursor-pointer' alt='plus-sign' />
}
export default MinusButton;