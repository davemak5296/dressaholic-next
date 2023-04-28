import { MouseEventHandler, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import ShoppingBag from '@/assets/icons-and-logos/icon-shopping-bag.svg'
import { SET_IS_CART_OPEN } from '@/store/cart/cart.reducer';
import { selectCartCount, selectIsCartOpen } from '@/store/cart/cart.selector';

const CartIcon = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const sumOfCartItems = useSelector(selectCartCount);

  const toggleDropDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    dispatch(SET_IS_CART_OPEN(!isCartOpen));
  };

  const handleClickOutside = (event: MouseEvent): void => {
    const tgt = event.target as Element;
    if (tgt.id == 'checkOutBtn') return;
    if (!ref.current?.contains(event.target as Node)) {
      dispatch(SET_IS_CART_OPEN(false));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={toggleDropDown}
      className="relative flex h-full w-11 cursor-pointer items-center justify-center"
    >
      <Image src={ShoppingBag} className="h-6 w-6" alt='shopping-bag'/>
      <span className="absolute text-xs font-bold">{sumOfCartItems}</span>
    </div>
  )
}

export default CartIcon;