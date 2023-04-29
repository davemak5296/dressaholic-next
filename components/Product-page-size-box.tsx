import { Dispatch, SetStateAction } from 'react';
import { Updater } from 'use-immer';
import { ActiveStateType } from './Product';
import { Product, SizeType } from '@/src/types';

type ProductPageSizeBoxProp = {
  style: string;
  stocks: Product['stocks'];
  active: ActiveStateType;
  sizeName: SizeType;
  setQtyToAdd: Dispatch<SetStateAction<number | string>>;
  setActive: Updater<ActiveStateType>;
};

const ProductPageSizeBox = ({
  stocks,
  style,
  active,
  sizeName,
  setQtyToAdd,
  setActive,
}: ProductPageSizeBoxProp) => {
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
