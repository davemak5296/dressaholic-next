import * as React from 'react';
import clsx from 'clsx';
import Footer from '../components/footer';
import useFooterFixed from '../hooks/useFooterFixed';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/cart/cart.selector';
import CartItem from '../components/cart-item.component';

const colTitleStyles = clsx('bg-secondary text-secondary-content text-base lg:text-lg pl-1');

const Cart: React.FC = () => {
  const { isFooterFixed, mainRef } = useFooterFixed();
  const itemsInCart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
      <main ref={mainRef} className="main-container h-auto px-3 sm:container sm:px-0">
        <h1 className="mx-auto flex justify-center py-2 text-xl md:py-4 md:text-2xl lg:py-4 lg:text-2xl xl:py-5 xl:text-3xl">
          CART
        </h1>
        {/* title - when larger than sm */}
        <section className="hidden grid-cols-cartXL sm:grid">
          <div className={colTitleStyles}>Product</div>
          <div className={colTitleStyles}>Description</div>
          <div className={colTitleStyles}>Price</div>
          <div className={colTitleStyles}>Qty</div>
          <div className={colTitleStyles}>Sub</div>
          <div className={colTitleStyles}></div>
        </section>
        {/* title - when smaller than sm */}
        <section className="grid grid-cols-cart-title sm:hidden">
          <div className={colTitleStyles}>Product</div>
          <div className={colTitleStyles}>Description</div>
        </section>
        {itemsInCart && itemsInCart.map((item, index) => <CartItem key={index} item={item} />)}
      </main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Cart;
