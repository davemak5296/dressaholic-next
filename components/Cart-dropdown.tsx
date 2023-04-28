import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '@/store/cart/cart.selector';
import { SET_IS_CART_OPEN } from '@/store/cart/cart.reducer';

const CartDropDown = () => {
  const itemsInCart = useSelector(selectCartItems);
  const router = useRouter();
  const dispatch = useDispatch();

  const navHandler: MouseEventHandler = () => {
    router.push('/cart');
    dispatch(SET_IS_CART_OPEN(false));
  };

  return (
    <div className="absolute top-[64px] right-[3%] z-[1] flex w-60 flex-col border border-solid border-black bg-white p-3 lg:top-[72px] xl:p-5">
      <div
        className={`${
          itemsInCart.length == 0 ? 'justify-center' : ''
        } flex h-[160px] flex-col overflow-y-scroll bg-white xl:h-[240px]`}
      >
        {/* items */}
        {itemsInCart.map(({ displayName, size, color, imageUrl, price, qty }, index) => (
          <section key={index} className="mb-3.5 flex">
            <img className="w-[30%]" src={imageUrl} alt={displayName} />
            <div className="flex w-[70%] flex-col items-start justify-center py-2.5 px-5 text-xs">
              <span>{displayName}</span>
              <span>{`${qty}x\$${price}`}</span>
              <span>{`${color},${size}`}</span>
            </div>
          </section>
        ))}
        {itemsInCart.length == 0 && <div>Your cart is empty. Let&apos;s go shopping now!</div>}
      </div>
      <button id="checkOutBtn" onClick={navHandler} className="daisy-btn-secondary py-2">
        GO TO CHECKOUT
      </button>
    </div>
  )
}

export default CartDropDown;