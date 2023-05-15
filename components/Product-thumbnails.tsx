import { Updater } from 'use-immer';
import { ActiveStateType } from './Product';
import { Product } from '@/src/types';
import { useEffect, useState } from 'react';

type ProductThumbnailsProps = {
  product: Product;
  active: ActiveStateType;
  setActive: Updater<ActiveStateType>;
};
const ProductThumbnails = ({ product, active, setActive }: ProductThumbnailsProps) => {
  const { color, stockNum, image } = active;
  const { imageUrls } = product;
  const [hasMount, setHasMount] = useState(false);

  useEffect(() => {
    setHasMount(true);
  }, [])

  return (
    <div className="order-1 w-1/6 sm:w-1/6">
      {color &&
        Object.values(imageUrls[color]).map(
          (imageUrl, index) =>
            imageUrl && (
              <div className={ `mb-2 last:mb-0 p-2 h-[80px] sm:h-[100px] border-solid ${image == imageUrl ? 'border-4 border-success' : 'border border-base-300'} cursor-pointer transition-all duration-100` }>
                <img
                  className={` ${stockNum == 0 ? 'opacity-40 grayscale' : 'grayscale-0'} mx-auto max-h-full`}
                  key={index}
                  src={!hasMount ? "/gray-sm.png" : imageUrl}
                  onClick={() => {
                    setActive((draft) => {
                      draft.image = imageUrl;
                    });
                  }}
                />
              </div>
            )
        )}
    </div>
  );
};

export default ProductThumbnails;
