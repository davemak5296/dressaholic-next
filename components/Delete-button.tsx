import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import CrossSign from '@/assets/icons-and-logos/circle-xmark-solid.svg';
import { GET_CART_ITEM } from "./Cart-dropdown";
import { GET_SUMOFITEM } from "./Cart-icon";
import { CartItemType } from "@/src/types";

const DELETE_ITEM = gql`
  mutation DeleteItem ($uid: String!, $targetItem: CartItemInput!) {
    deleteItem (uid: $uid, targetItem: $targetItem)
  }
`
type DelButtonProps = {
  uid: string;
  item: CartItemType & { __typename: string};
}

const DeleteButton = ({uid, item}: DelButtonProps) => {
  const { __typename, ...neededFields } = item
  const [ delItem ] = useMutation(DELETE_ITEM);

  return <Image src={CrossSign} onClick={() => delItem({
    variables: {
      uid: uid,
      targetItem: {
        ...neededFields
      }
    },
    refetchQueries: [
      GET_CART_ITEM, GET_SUMOFITEM
    ]
  })} className='ml-1 h-4 w-4 cursor-pointer' alt='plus-sign' />
}
export default DeleteButton;