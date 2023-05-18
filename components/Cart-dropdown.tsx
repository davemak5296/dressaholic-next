import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import Spinner from './Spinner';
import { CartItemFieldNames } from '@/src/utils/apollo.utils';
import { cartOpenAtom } from 'pages/_app';
import { useAtom } from 'jotai';

export const GET_CART_ITEM = gql`
  query GetCurrCart($uid: String!) {
    currentCart(uid: $uid) {
      ${CartItemFieldNames}
    }
  }
`

const CartDropDown = () => {
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom);
  const router = useRouter();

  const [ cookies ] = useCookies();
  const {loading, error, data} = useQuery(GET_CART_ITEM, {
    variables: {
      uid: cookies.user
    },
    skip: !cookies.user,
  });

  const navHandler: MouseEventHandler = () => {
    router.push('/cart');
    setIsCartOpen(false);
  };

  return (
    <div className="absolute top-[64px] right-[3%] z-[1] flex w-60 flex-col border border-solid border-black bg-white p-2 lg:top-[72px]">
      <div
        className={`${
          cookies['user']
            ? data?.currentCart?.length == 0
              ? 'justify-center'
              : ''
            : 'justify-center'
        } flex h-[160px] flex-col overflow-y-scroll bg-white xl:h-[240px]`}
      >
        {/* items */}
        { cookies['user']
            ? loading
              ? <Spinner />
              : data?.currentCart?.length == 0
                ? <div>Your cart is empty, let&apos;s go shopping now!</div>
                : data?.currentCart?.map(({ displayName, size, color, imageUrl, price, qty }, index) => (
                    <section key={index} className='ml-[-8px] mb-3.5 grid grid-cols-[50px_80px_60px] h-[35px] gap-x-2 items-center text-[10px] leading-[12px]'>
                      <img className="mx-auto max-h-[35px]" src={imageUrl} alt={displayName} />
                      <p>{displayName}</p>
                      <div>
                        <p><strong>{qty}</strong>{` - \$${price}`}</p>
                        <p>{`${color}, ${size}`}</p>
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