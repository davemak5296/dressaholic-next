import { useState, useRef, MouseEventHandler, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Product } from '@/src/types';
import { motion } from 'framer-motion';
type ProductCardProp = {
  card: Product;
  chosenBrands: number;
};

const ProductCard = ({ card: { sku, brand, displayName, imageUrls, stocks, price}, chosenBrands}: ProductCardProp) => {
  const colors = Object.keys(stocks);
  const isOutOfStock = false;
  const [hasMount, setHasMount] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const category = router.query?.category as string;

  useEffect(() => {
    setHasMount(true);
  }, [])

  const chgDisplayImgHandler: MouseEventHandler<HTMLImageElement> = (e) => {
    const tgt = e.target as HTMLImageElement;
    imgRef.current?.setAttribute('src', tgt.getAttribute('src') as string);
  };

  return (
    // <640px, flex; >640px, flex column
    <motion.div
      key={chosenBrands}
      initial={{
        y: 30,
        opacity: 0.5
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      className='relative col-span-1 flex border border-solid border-slate-200 p-2 sm:flex-col sm:items-center sm:p-4'
    >
      <div className="left-26 bottom-26 absolute top-2 right-4 z-10 hidden bg-yellow-300 px-1 text-lg sm:block">
        {`\$${price}`}
      </div>
      <section className="flex w-1/3 grow-0 flex-col sm:w-auto sm:items-center">
        <img
          src={ !hasMount ? "/gray.png" : imageUrls[colors[0]]['thumbnail']}
          ref={imgRef}
          className={`w-full max-h-[200px] transition-all ${isOutOfStock ? 'grayscale' : 'grayscale-0'}`}
          alt={`${brand} ${displayName}`}
        />
        {isOutOfStock && (
          <div className="absolute right-0 left-0 bottom-[50%] flex justify-center bg-slate-100 text-xl text-black opacity-80">
            out of stock
          </div>
        )}
      </section>
      <section className="mt-2 grid grid-cols-4 gap-2 place-self-start">
        {colors.map((color) => (
          <img
            src={ !hasMount ? "/gray-sm.png": imageUrls[color]['thumbnail']}
            key={color}
            className="h-10 cursor-pointer"
            onClick={chgDisplayImgHandler}
          />
        ))}
      </section>
      <section className="flex w-2/3 grow flex-col items-center justify-evenly sm:w-full">
        <div className="text-md mt-1 grow-0 font-bold">{brand}</div>
        <div className="sm:grow">{displayName}</div>
        <div className="block grow-0 bg-yellow-300 px-1 text-lg sm:hidden">{`\$${price}`}</div>
        <Link
          href={`/shop/${category}/${sku}`}
          className={`block w-[80%] grow-0 p-2 text-lg sm:mt-4 sm:w-full ${
            isOutOfStock ? 'daisy-btn-ghost daisy-btn-active' : 'daisy-btn-secondary'
          }`}
        >
          <button className="flex w-full justify-center" aria-label={`click to enter detailed page of ${brand} ${displayName}`}>View</button>
        </Link>
      </section>
    </motion.div>
  );
};

export default ProductCard;
