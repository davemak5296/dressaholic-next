import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product, UseParamsCategoryType } from '../../types';
type ProductCardProp = {
  card: Product;
};

const ProductCard: React.FC<ProductCardProp> = (props) => {
  const { sku, brand, displayName, imageUrls, stocks, price } = props.card;
  const colors = Object.keys(stocks);
  const isOutOfStock = false;

  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
    if (e.target instanceof HTMLImageElement) {
      imgRef.current?.setAttribute('src', e.target.getAttribute('src') as string);
    }
  };

  return (
    // <640px, flex; >640px, flex column
    <div className="relative col-span-1 flex border border-solid border-slate-200 p-2 sm:flex-col sm:items-center sm:p-4">
      <div className="left-26 bottom-26 absolute top-2 right-4 z-10 hidden bg-yellow-300 px-1 text-lg sm:block">
        {`\$${price}`}
      </div>
      <section className="flex w-1/3 grow-0 flex-col sm:w-auto sm:items-center">
        <img
          ref={imgRef}
          className={`w-full ${isOutOfStock ? 'grayscale' : 'grayscale-0'}`}
          src={imageUrls[colors[0]]['thumbnail']}
        />
        {isOutOfStock && (
          <div className="absolute right-0 left-0 bottom-[50%] flex justify-center bg-slate-100 text-xl text-black opacity-80">
            out of stock
          </div>
        )}

        <div className="mt-2 grid grid-cols-4 gap-2 place-self-start">
          {colors.map((color) => (
            <img
              key={color}
              src={imageUrls[color]['thumbnail']}
              className="h-10 cursor-pointer"
              onClick={handleClick}
            />
          ))}
        </div>
      </section>
      <section className="flex w-2/3 grow flex-col items-center justify-evenly sm:w-full">
        <div className="text-md mt-1 grow-0 font-bold">{brand}</div>
        <div className="grow">{displayName}</div>
        <div className="block grow-0 bg-yellow-300 px-1 text-lg sm:hidden">{`\$${price}`}</div>
        <Link
          to={`/shop/${category}/${sku}`}
          className={`block w-[80%] grow-0 p-2 text-lg sm:mt-4 sm:w-full ${
            isOutOfStock ? 'daisy-btn-ghost daisy-btn-active' : 'daisy-btn-secondary'
          }`}
        >
          <div className="flex w-full justify-center">View</div>
        </Link>
      </section>
    </div>
  );
};

export default ProductCard;
