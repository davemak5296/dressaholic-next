import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { graphql } from '@/src/gql';
import Spinner from './Spinner';
import { cartOpenAtom } from 'pages/_app';
import { useAtom } from 'jotai';
import useAuthStateListener from '@/src/hooks/useAuthListener';

export const GET_CART_ITEM = graphql(`
  query GetCurrentCart($uid: String!) {
    currentCart(uid: $uid) {
      sku
      brand
      displayName
      imageUrl
      price
      color
      size
      qty
    }
  }
`)

const CartDropDown = () => {
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom);
  const router = useRouter();
  const { currUser } = useAuthStateListener();

  const {loading, error, data} = useQuery(GET_CART_ITEM, {
    variables: {
      uid: currUser?.uid as string
    },
    skip: !currUser?.uid,
    pollInterval: 1000
  });

  const navHandler: MouseEventHandler = () => {
    router.push('/cart');
    setIsCartOpen(false);
  };

  return (
    <div className="absolute top-[64px] right-[3%] z-[1] flex w-60 flex-col border border-solid border-black bg-white p-2 lg:top-[72px]">
      <div
        className={`${
          currUser?.uid
            ? data?.currentCart?.length == 0
              ? 'justify-center'
              : ''
            : 'justify-center'
        } dropdown-container flex h-[160px] flex-col overflow-y-scroll bg-white xl:h-[240px]`}
      >
        {/* items */}
        { currUser?.uid
            ? loading
              ? <Spinner />
              : data?.currentCart?.length == 0
                ? <div>Your cart is empty, let&apos;s go shopping now!</div>
                : data?.currentCart?.map((item, index) => (
                    <section key={index} className='ml-[-8px] mb-3.5 grid grid-cols-[50px_80px_60px] h-[35px] gap-x-2 items-center text-[10px] leading-[12px]'>
                      <img className="mx-auto max-h-[35px]" src={item?.imageUrl} alt={item?.displayName} />
                      <p>{item?.displayName}</p>
                      <div>
                        <p><strong>{item?.qty}</strong>{` - \$${item?.price}`}</p>
                        <p>{`${item?.color}, ${item?.size}`}</p>
                      </div>
                    </section>
                  ))
            : <div>Login to Shop!</div>
        }
      </div>
      <button id="checkOutBtn" onClick={navHandler} className="daisy-btn-secondary py-2">
        GO TO CHECKOUT
      </button>
    </div>
  )
}

export default CartDropDown;