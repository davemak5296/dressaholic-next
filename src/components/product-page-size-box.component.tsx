import * as React from 'react';
import { Updater } from 'use-immer';
import { ActiveStateType } from '../pages/product-page';
import { Product, SizeType } from '../types';

type ProductPageSizeBoxProp = {
  style: string;
  stocks: Product['stocks'];
  active: ActiveStateType;
  sizeName: SizeType;
  setQtyToAdd: React.Dispatch<React.SetStateAction<number | string>>;
  setActive: Updater<ActiveStateType>;
};

const ProductPageSizeBox: React.FC<ProductPageSizeBoxProp> = ({
  stocks,
  style,
  active,
  sizeName,
  setQtyToAdd,
  setActive,
}) => {
  return (
    <li
      className={`${style} ${
        active.size == sizeName ? 'border-1 border-success bg-success/50 shadow' : 'shadow-none'
      }`}
      onClick={() => {
        setActive((draft) => {
          draft.size = sizeName;
          draft.stockNum = stocks[draft.color][sizeName];
        });
        setQtyToAdd(1);
      }}
    >
      {sizeName}
    </li>
  );
};

export default ProductPageSizeBox;
