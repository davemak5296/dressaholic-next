import * as React from 'react';
import { Updater } from 'use-immer';
import { ActiveStateType } from '../pages/product-page';
import { Product } from '../types';

type ProductThumbnailsProps = {
  product: Product;
  active: ActiveStateType;
  setActive: Updater<ActiveStateType>;
};
const ProductThumbnails: React.FC<ProductThumbnailsProps> = ({ product, active, setActive }) => {
  const { color, stockNum, image } = active;
  const { imageUrls } = product;

  return (
    <div className="order-2 m-2 mt-0 flex w-2/3 lg:order-1 lg:block lg:w-1/6">
      {color &&
        Object.values(imageUrls[color]).map(
          (imageUrl, index) =>
            imageUrl && (
              <img
                className={` ${stockNum == 0 ? 'opacity-40 grayscale' : 'grayscale-0'} ${
                  image == imageUrl ? 'border-4 border-success' : 'border border-base-300'
                } mb-2 ml-4 h-full w-1/5 cursor-pointer border-solid p-2 transition-all duration-100 last:mb-0 sm:w-1/3 lg:ml-0 lg:h-auto lg:w-auto`}
                key={index}
                src="/gray-sm.png"
                onClick={() => {
                  setActive((draft) => {
                    draft.image = imageUrl;
                  });
                }}
                onLoad={(e) => {
                  const tgt = e.target as HTMLImageElement;
                  tgt.setAttribute('src', imageUrl);
                }}
              />
            )
        )}
    </div>
  );
};

export default ProductThumbnails;
