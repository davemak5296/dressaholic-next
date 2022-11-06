import * as React from 'react';
import { MouseEventHandler, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as ShoppingBag } from '../assets/icon-shopping-bag.svg';
import { SET_IS_CART_OPEN } from '../store/cart/cart.reducer';
import { selectCartCount, selectIsCartOpen } from '../store/cart/cart.selector';

const CartIcon: React.FC = () => {
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

  React.useEffect(() => {
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
      <ShoppingBag className="h-6 w-6" />
      <span className="absolute text-xs font-bold">{sumOfCartItems}</span>
    </div>
  );
};

export default CartIcon;
// export default React.memo(CartIcon);
