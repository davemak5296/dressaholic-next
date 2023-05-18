import { useMutation } from "@apollo/client";
import Image from "next/image";
import { graphql } from '@/src/gql';
import CrossSign from '@/assets/icons-and-logos/circle-xmark-solid.svg';
import { GET_CART_ITEM } from "./Cart-dropdown";
import { GET_SUMOFITEM } from "./Cart-icon";
import { CartItemType } from "@/src/types";
import { GET_CART_AND_TOTAL } from "pages/cart";

const DELETE_ITEM = graphql(`
  mutation DeleteItem ($uid: String!, $targetItem: CartItemInput!) {
    deleteItem (uid: $uid, targetItem: $targetItem)
  }
`)

type DelButtonProps = {
  uid: string;
  item: CartItemType;
}

const DeleteButton = ({uid, item}: DelButtonProps) => {
  const [ delItem ] = useMutation(DELETE_ITEM);

  return <Image src={CrossSign} onClick={() => delItem({
    variables: {
      uid: uid,
      targetItem: item
    },
    refetchQueries: [
      GET_CART_ITEM, GET_SUMOFITEM, GET_CART_AND_TOTAL
    ]
  })} className='ml-1 h-4 w-4 cursor-pointer' alt='plus-sign' />
}
export default DeleteButton;