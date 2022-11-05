import * as React from 'react';
import clsx from 'clsx';
import { ReactComponent as MinusSign } from '../assets/circle-minus-solid.svg';
import { ReactComponent as PlusSign } from '../assets/circle-plus-solid.svg';
import { ReactComponent as CrossSign } from '../assets/circle-xmark-solid.svg';
import Footer from '../components/footer';

const colTitleStyles = clsx('bg-secondary text-secondary-content text-base lg:text-lg pl-1');

const Cart: React.FC = () => {
  const mainRef = React.useRef<HTMLElement>(null);
  const [isFooterFixed, setIsFooterFixed] = React.useState(true);

  const setFooter = (mainRef: React.RefObject<HTMLElement>) => {
    if (mainRef == null) return;
    const mainH = mainRef.current?.clientHeight as number;
    window.innerHeight - 184 < mainH ? setIsFooterFixed(false) : setIsFooterFixed(true);
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => setFooter(mainRef));
  }, []);

  React.useEffect(() => {
    let intervalId = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    });
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
            <MinusSign className="h-4 w-4 cursor-pointer">-</MinusSign>
            <div className="ml-1">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer">-</PlusSign>
          </div>
          <div className="col-span-1 col-start-4 row-span-1 row-start-2 flex justify-center font-bold">
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
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <section className="hidden grid-cols-cartXL items-center text-sm sm:grid lg:text-base xl:text-lg">
          <div className="p-4">
            <img className="w-2/3" src="./men-jacket-1.webp" alt="" />
          </div>
          <div className="w-4/5">
            Kirkland Signature Men&apos;s Jacket Kirkland Signature Men&apos;s Jacket
          </div>
          <div>$43.98</div>
          <div className="flex items-center">
            <MinusSign className="h-4 w-4 cursor-pointer" />
            <div className="ml-1 text-lg">1</div>
            <PlusSign className="ml-1 h-4 w-4 cursor-pointer" />
          </div>
          <div>$43.98</div>
          <CrossSign className="flex h-5 w-5 justify-center" />
        </section>
        <hr />
      </main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Cart;
