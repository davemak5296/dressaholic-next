import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cart/cart.selector';
import { SET_IS_CART_OPEN } from '@/store/cart/cart.reducer';
import { gql, useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import Spinner from './Spinner';
import { CartItemFieldNames } from '@/src/utils/apollo.utils';

export const GET_CART_ITEM = gql`
  query GetCurrCart($uid: String!) {
    currentCart(uid: $uid) {
      ${CartItemFieldNames}
    }
  }
`

const CartDropDown = () => {
  const itemsInCart = useSelector(selectCartItems);
  const router = useRouter();
  const dispatch = useDispatch();

  const [ cookies ] = useCookies();
  const {loading, error, data} = useQuery(GET_CART_ITEM, {
    variables: {
      uid: cookies.user
    },
    skip: !cookies.user,
    // pollInterval: 500,
    // fetchPolicy: 'cache-and-network'
  });

  const navHandler: MouseEventHandler = () => {
    router.push('/cart');
    dispatch(SET_IS_CART_OPEN(false));
  };

  console.log('data from useQuery is \n' + JSON.stringify(data, null, 2))

  return (
    <div className="absolute top-[64px] right-[3%] z-[1] flex w-60 flex-col border border-solid border-black bg-white p-2 lg:top-[72px]">
      <div
        className={`${
          cookies['user']
            ? data?.currentCart?.length == 0
              ? 'justify-center'
              : ''
            : 'justify-center'
          // loading || data.currentCart.length == 0 ? 'justify-center' : ''
          // itemsInCart.length == 0 ? 'justify-center' : ''
        } flex h-[160px] flex-col overflow-y-scroll bg-white xl:h-[240px]`}
      >
        {/* items */}
        {cookies['user']
          ? loading
            ? <Spinner />
            : data?.currentCart?.map(({ displayName, size, color, imageUrl, price, qty }, index) => (
        // {itemsInCart.map(({ displayName, size, color, imageUrl, price, qty }, index) => (
              <section key={index} className='ml-[-8px] mb-3.5 grid grid-cols-[50px_80px_60px] h-[35px] gap-x-2 items-center text-[10px] leading-[12px]'>
                <img className="mx-auto max-h-[35px]" src={imageUrl} alt={displayName} />
                <p>{displayName}</p>
                <div>
                  <p><strong>{qty}</strong>{` - \$${price}`}</p>
                  <p>{`${color}, ${size}`}</p>
                </div>
              </section>
              ))
          : null}
        {/* loading ? <Spinner /> : data.currentCart.map(({ displayName, size, color, imageUrl, price, qty }, index) => (
        // {itemsInCart.map(({ displayName, size, color, imageUrl, price, qty }, index) => (
          <section key={index} className="mb-3.5 flex">
            <img className="w-[30%]" src={imageUrl} alt={displayName} />
            <div className="flex w-[70%] flex-col items-start justify-center py-2.5 px-5 text-xs">
              <span>{displayName}</span>
              <span>{`${qty}x\$${price}`}</span>
              <span>{`${color},${size}`}</span>
            </div>
          </section>
        ))
        } */}
        { cookies['user']
            ? loading
              ? <Spinner />
              : data?.currentCart?.length == 0 && <div>Your cart is empty. Let&apos;s go shopping now!</div>
            : <div>Login to Shop!</div>
        }
        {/* loading ? <Spinner /> : data.currentCart.length == 0 && <div>Your cart is empty. Let&apos;s go shopping now!</div>} */}
        {/* {itemsInCart.length == 0 && <div>Your cart is empty. Let&apos;s go shopping now!</div>} */}
      </div>
      <button id="checkOutBtn" onClick={navHandler} className="daisy-btn-secondary py-2">
        GO TO CHECKOUT
      </button>
    </div>
  )
}

export default CartDropDown;