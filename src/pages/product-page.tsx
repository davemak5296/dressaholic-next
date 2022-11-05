import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useImmer } from 'use-immer';
import validator from 'validator';
import { Product, UseParamsCategoryType, UseParamsSkuType, SizeType } from '../types';
import { selectCategoriesMap } from '../store/category/categories.selector';
import useFooterFixed from '../hooks/useFooterFixed';

import ProductPageSizeBox from '../components/product-page-size-box.component';
import Breadcrumbs from '../components/breadcrumbs';
import Footer from '../components/footer';
import { ReactComponent as PlusSign } from '../assets/square-plus-regular.svg';
import { ReactComponent as MinusSign } from '../assets/square-minus-regular.svg';
import { motion } from 'framer-motion';

export type ActiveStateType = {
  color: string;
  size: SizeType;
  image: string;
  stockNum: number;
  colorBox: number;
};
const boxStyle =
  'mx-2 text-sm cursor-pointer transition-all duration-[200] border border-solid border-slate-200 px-2 py-1 sm:px-3 sm:py-1 sm:text-base first:ml-0';
const sizes: SizeType[] = ['sm', 'md', 'lg', 'xl'];

const ProductPage: React.FC = () => {
  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const { skuInUrl } = useParams<keyof UseParamsSkuType>() as UseParamsSkuType;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [product, setProduct] = React.useState<Product>({} as Product);
  const { sku, brand, displayName, colors, imageUrls, stocks, price } = product;
  const [qtyToAdd, setQtyToAdd] = React.useState<number | string>(1);
  const [active, setActive] = useImmer<ActiveStateType>({
    color: '',
    size: 'sm',
    image: '',
    stockNum: 0,
    colorBox: 0,
  });
  const { isFooterFixed, mainRef } = useFooterFixed();

  const isEmpty = (object: object) => Object.keys(object).length == 0;
  const qtyBoxHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const str = e.target.value;
    if (validator.isNumeric(str)) {
      if (str == '0') return setQtyToAdd(1); //when input 0, set to 1

      return active.stockNum >= parseInt(str)
        ? setQtyToAdd(parseInt(str))
        : setQtyToAdd(active.stockNum); // when input > stockNum, keep unchange
    }
    setQtyToAdd(''); // when input is not number, clear
  };

  React.useEffect(() => {
    if (isEmpty(categoriesMap)) return;
    setProduct(
      categoriesMap[category].filter((item) => {
        return item.sku == skuInUrl;
      })[0]
    );
  }, [categoriesMap, category]);

  React.useEffect(() => {
    if (isEmpty(product)) return;
    setActive((draft) => {
      draft.color = colors[0];
      draft.image = imageUrls[colors[0]]['thumbnail'];
      draft.stockNum = stocks[colors[0]][draft.size];
    });
  }, [product]);

  return (
    <>
      <motion.main
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.3,
        }}
        ref={mainRef}
        key={skuInUrl}
        className="main-container px-4"
      >
        <Breadcrumbs />
        <div className="flex flex-col pt-0 pb-2 sm:flex-row sm:py-4">
          <div className="my-2 text-xl text-accent-content sm:hidden">{brand}</div>
          <div className="text-2xl font-bold text-primary sm:hidden">{displayName}</div>
          {/* first column */}
          <div className="flex flex-col items-center sm:w-1/2 lg:flex-row">
            <div className="order-2 m-2 mt-0 flex w-2/3 lg:order-1 lg:block lg:w-1/6">
              {active.color &&
                Object.values(imageUrls[active.color]).map(
                  (imageUrl, index) =>
                    imageUrl && (
                      <img
                        className={` ${
                          active.stockNum == 0 ? 'opacity-40 grayscale' : 'grayscale-0'
                        } ${
                          active.image == imageUrl
                            ? 'border-4 border-success'
                            : 'border border-base-300'
                        } mb-2 ml-4 h-full w-1/5 cursor-pointer border-solid p-2 transition-all duration-100 last:mb-0 sm:w-1/3 lg:ml-0 lg:h-auto lg:w-auto`}
                        key={index}
                        src={imageUrl}
                        onClick={() => {
                          setActive((draft) => {
                            draft.image = imageUrl;
                          });
                        }}
                      />
                    )
                )}
            </div>
            <div className="relative order-1 mb-4 flex w-full items-start justify-center lg:order-2 lg:w-5/6">
              {active.stockNum == 0 && (
                <div className="absolute right-0 left-0 bottom-[50%] z-20 mx-4 flex skew-y-[-15deg] justify-center bg-base-200/60 py-4 text-4xl font-bold">
                  Out of stock
                </div>
              )}
              <img
                className={`${
                  active.stockNum == 0 ? 'opacity-40 grayscale' : 'grayscale-0'
                } w-1/3 sm:w-4/5`}
                src={active.image}
                alt=""
              />
            </div>
          </div>
          {/* second column */}
          <div className="flex w-full sm:w-1/2">
            <div className="flex w-full flex-col lg:w-4/6">
              <div className="my-2 hidden text-xl text-accent-content sm:block">{brand}</div>
              <div className="hidden text-2xl font-bold text-primary sm:block">{displayName}</div>
              <div className="mt-2 ml-0 text-xl text-black sm:mt-5 lg:my-5 lg:ml-4">{`$${price}.00`}</div>
              <div className="flex w-full items-center">
                <div className="flex w-full flex-col">
                  <p className="mt-2 sm:mt-8">
                    <span className="text-base text-secondary-focus underline underline-offset-4 sm:text-lg">
                      Stocks left:
                    </span>
                    <span
                      className={`${
                        active.stockNum == 1 ? 'text-xl text-red-600' : 'text-secondary-focus '
                      } font-bold`}
                    >
                      &nbsp;&nbsp;&nbsp;{active.stockNum}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <PlusSign
                      className="h-4 w-4 cursor-pointer sm:h-6 sm:w-6 lg:h-8 lg:w-8"
                      onClick={() => {
                        setQtyToAdd((prev) => {
                          if (typeof prev == 'number') {
                            return active.stockNum > prev ? prev + 1 : prev;
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
                      className={`${
                        active.stockNum == 0 || qtyToAdd == ''
                          ? 'daisy-btn-active daisy-btn-ghost '
                          : 'daisy-btn-primary'
                      } ml-12 self-end px-3 py-2 text-sm uppercase shadow-xl sm:px-5 sm:py-3 lg:text-base`}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <ul className="mt-4 flex items-center sm:mt-14">
                <span className="text-sm sm:text-lg">Color </span>
                {colors &&
                  colors.map((color, index) => (
                    <li
                      key={index}
                      className={`${boxStyle} ${
                        active.colorBox == index
                          ? 'border-1 border-success bg-success/50 shadow'
                          : 'shadow-none transition-all duration-[200]'
                      }`}
                      onClick={() => {
                        setActive((draft) => {
                          draft.color = color;
                          draft.image = imageUrls[color]['thumbnail'];
                          draft.stockNum = stocks[color][draft.size];
                          draft.colorBox = index;
                        });
                        setQtyToAdd(1);
                      }}
                    >
                      {color}
                    </li>
                  ))}
              </ul>
              <ul className="mt-4 flex items-center sm:mt-6">
                <span className="text-sm sm:text-lg">Size </span>
                {sizes.map((size, index) => (
                  <ProductPageSizeBox
                    key={index}
                    stocks={stocks}
                    active={active}
                    setActive={setActive}
                    sizeName={size}
                    style={boxStyle}
                    setQtyToAdd={setQtyToAdd}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default ProductPage;
