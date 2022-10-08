import * as React from 'react';
import clsx from 'clsx';

const colTitleStyles = clsx('bg-secondary text-secondary-content text-base lg:text-lg pl-1');

const Cart: React.FC = () => {
  return (
    <>
      <main className="main-container h-screen px-3 py-3 sm:container">
        <h1 className="mx-auto my-3 flex justify-center text-2xl md:my-5 md:text-3xl lg:my-7 lg:text-4xl xl:my-9 xl:text-5xl">
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
        {/* cart item - when smaller than sm */}
        <section className="grid grid-cols-cart text-xs xs:text-sm sm:hidden">
          <div className="col-span-1 col-start-1 row-span-2 row-start-1 flex justify-center p-2">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="col-span-3 col-start-2 row-span-1 row-start-1 p-2 xs:pt-4">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div className="col-span-1 col-start-2 row-span-1 row-start-2 flex justify-center">
            $43.98
          </div>
          <div className="col-span-1 col-start-3 row-span-1 row-start-2 flex justify-center">
            -1+
          </div>
          <div className="col-span-1 col-start-4 row-span-1 row-start-2 flex justify-center">
            $43.98
          </div>
        </section>
        {/* cart item - when larger than sm */}
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex">
            <span className="ml-4">-</span>
            <span>1</span>
            <span>+</span>
          </div>
          <div>$43.98</div>
          <div className="flex justify-center">x</div>
        </section>
        <hr />
      </main>
    </>
  );
};

export default Cart;
