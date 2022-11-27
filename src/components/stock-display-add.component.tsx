import * as React from 'react';
import { ActiveStateType } from '../pages/product-page';
import { ReactComponent as PlusSign } from '../assets/square-plus-regular.svg';
import { ReactComponent as MinusSign } from '../assets/square-minus-regular.svg';

type StockDisplayAndAddProps = {
  stockNum: ActiveStateType['stockNum'];
  qtyToAdd: string | number;
  setQtyToAdd: React.Dispatch<React.SetStateAction<string | number>>;
  qtyBoxHandler: React.ChangeEventHandler<HTMLInputElement>;
  btnHandler: React.MouseEventHandler;
};

const StockDisplayAndAdd: React.FC<StockDisplayAndAddProps> = ({
  stockNum,
  qtyToAdd,
  setQtyToAdd,
  qtyBoxHandler,
  btnHandler,
}) => {
  return (
    <div className="flex w-full items-center">
      <div className="flex w-full flex-col">
        <p className="mt-2 sm:mt-8">
          <span className="text-base text-secondary-focus underline underline-offset-4 sm:text-lg">
            Stocks left:
          </span>
          <span
            className={`${
              stockNum == 1 ? 'text-xl text-red-600' : 'text-secondary-focus '
            } font-bold`}
          >
            &nbsp;&nbsp;&nbsp;{stockNum}
          </span>
        </p>
        <div className="flex items-center">
          <PlusSign
            className="h-4 w-4 cursor-pointer sm:h-6 sm:w-6 lg:h-8 lg:w-8"
            onClick={() => {
              setQtyToAdd((prev) => {
                if (typeof prev == 'number') {
                  return stockNum > prev ? prev + 1 : prev;
                }
                return 1; // when input is empty, set to 1
              });
            }}
          />
          <input
            type="text"
            className="w-[50px] text-center text-base outline-none sm:text-xl"
            onChange={qtyBoxHandler}
            value={qtyToAdd}
          />
          <MinusSign
            className="h-4 w-4 cursor-pointer sm:h-6 sm:w-6 lg:h-8 lg:w-8"
            onClick={() => {
              setQtyToAdd((prev) => {
                if (typeof prev == 'number') {
                  return prev > 1 ? prev - 1 : prev;
                }
                return 1; // when input is empty, set to 1
              });
            }}
          />
          <button
            onClick={btnHandler}
            className={`${
              stockNum == 0 || qtyToAdd == ''
                ? 'daisy-btn-active daisy-btn-ghost '
                : 'daisy-btn-primary'
            } ml-12 self-end px-3 py-2 text-sm uppercase shadow-xl sm:px-5 sm:py-3 lg:text-base`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StockDisplayAndAdd);
