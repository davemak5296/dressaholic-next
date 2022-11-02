import * as React from 'react';
import { Updater } from 'use-immer';
import { ActiveType } from '../pages/product-page';
import { Product, SizeType } from '../types';

type ProductPageSizeBoxProp = {
  style: string;
  product: Product;
  active: ActiveType;
  // activeSize: SizeType;
  sizeName: SizeType;
  // setSize: React.Dispatch<React.SetStateAction<SizeType>>;
  setQtyToAdd: React.Dispatch<React.SetStateAction<number | string>>;
  setActive: Updater<ActiveType>;
};

const ProductPageSizeBox: React.FC<ProductPageSizeBoxProp> = ({
  product,
  style,
  active,
  // activeSize,
  sizeName,
  // setSize,
  setQtyToAdd,
  setActive,
}) => {
  const { stocks } = product;
  return (
    <li
      className={`${style} ${
        active.size == sizeName ? 'border-1 border-success bg-success/50 shadow' : 'shadow-none'
        // activeSize == sizeName ? 'border-1 border-success bg-success/50 shadow' : 'shadow-none'
      }`}
      onClick={() => {
        setActive((draft) => {
          draft.size = sizeName;
          draft.stockNum = stocks[draft.color][sizeName];
        });
        setQtyToAdd(1);
        // setSize(sizeName);
      }}
    >
      {sizeName}
    </li>
  );
};

export default ProductPageSizeBox;
