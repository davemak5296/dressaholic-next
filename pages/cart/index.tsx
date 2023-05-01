import { useSelector } from 'react-redux';
import Link from 'next/link';
import clsx from 'clsx';
import Footer from '@/components/Footer';
import useFooterFixed from '@/hooks/useFooterFixed';
import { selectCartItems, selectCartTotal } from '@/store/cart/cart.selector';
import CartItem from '@/components/Cart-item.component';

const colTitleStyles = clsx('bg-secondary text-secondary-content text-base lg:text-lg pl-1');

const Cart = () => {
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
        <div className="float-right mt-4 text-2xl">{`TOTAL: ${cartTotal}`}</div>
        <div className="clear-both"></div>
        {cartTotal !== 0 && (
          <Link
            href="/place-order"
            className="daisy-btn-primary float-right my-4 px-3 py-2 text-sm uppercase sm:px-5 sm:py-3 lg:text-lg"
          >
            Place order
          </Link>
        )}
        <div className="clear-both"></div>
      </main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Cart;
