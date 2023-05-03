import { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useImmer } from 'use-immer';
import validator from 'validator';
import { motion } from 'framer-motion';
import { Product, SizeType } from '@/src/types';
import useFooterFixed from '@/hooks/useFooterFixed';
import { selectCategoriesMap } from '@/store/category/categories.selector';
import { addItemToCart } from '@/store/cart/cart.action';
import { selectCartItems } from '@/store/cart/cart.selector';
import { SET_IS_CART_OPEN } from '@/store/cart/cart.reducer';

import ProductPageSizeBox from './Product-page-size-box';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';
import StockDisplayAndAdd from './Stock-display-add';
import ProductThumbnails from './Product-thumbnails';

export type ActiveStateType = {
  color: string;
  size: SizeType;
  image: string;
  stockNum: number;
};

const boxStyle =
  'mx-2 text-sm cursor-pointer transition-all duration-[200] border border-solid border-slate-200 px-2 py-1 sm:px-3 sm:py-1 sm:text-base first:ml-0';

const sizes: SizeType[] = ['sm', 'md', 'lg', 'xl'];

const Product = () => {
  const dispatch = useDispatch();
  const categoriesMap = useSelector(selectCategoriesMap);
  const itemsInCart = useSelector(selectCartItems);

  const [productShown, setProductShown] = useState<Product>({} as Product);
  const [qtyToAdd, setQtyToAdd] = useState<number | string>(1);
  const [attrsForSelectedColor, setAttrsForSelectedColor] = useImmer<ActiveStateType>({
    color: '',
    size: 'sm',
    image: '',
    stockNum: 0,
  });
  const { isFooterFixed, mainRef } = useFooterFixed();

  const router = useRouter();
  const category = router.query?.category as string;
  const skuInUrl = router.query?.skuInUrl as string;
  const { sku, brand, displayName, colors, imageUrls, stocks, price } = productShown;

  const objIsEmpty = (object: object) => Object.keys(object).length == 0;

  const qtyBoxChgHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const str = e.target.value;
    if (validator.isNumeric(str)) {
      if (str == '0') return setQtyToAdd(1); //when input 0, set to 1

      return attrsForSelectedColor.stockNum >= parseInt(str)
        ? setQtyToAdd(parseInt(str))
        : setQtyToAdd(attrsForSelectedColor.stockNum); // when input > stockNum, set to stockNum
    }

    setQtyToAdd(''); // when input is not number, clear
  };

  const btnClickHandler: MouseEventHandler = () => {
    if (attrsForSelectedColor.stockNum == 0 || qtyToAdd == '') return;  // jump out if no stock or qty box is empty
    dispatch(SET_IS_CART_OPEN(true));
    dispatch(
      addItemToCart(
        itemsInCart,
        {
          sku,
          brand,
          displayName,
          imageUrl: attrsForSelectedColor.image,
          price,
          color: attrsForSelectedColor.color,
          size: attrsForSelectedColor.size,
          qty: qtyToAdd as number,
        },
        false
      )
    );
  };

  useEffect(() => {
    if (objIsEmpty(categoriesMap)) return;
    setProductShown(
      categoriesMap[category].filter((item) => {
        return item.sku == skuInUrl;
      })[0]
    );
  }, [categoriesMap, category]);

  useEffect(() => {
    if (objIsEmpty(productShown)) return;
    setAttrsForSelectedColor((draft) => {
      draft.color = colors[0];
      draft.image = imageUrls[colors[0]]['thumbnail'];
      draft.stockNum = stocks[colors[0]][draft.size];
    });
  }, [productShown]);

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
          {/* brand and displayName for < sm size */}
          <div className="my-2 text-xl text-accent-content sm:hidden">{brand}</div>
          <div className="text-2xl font-bold text-primary sm:hidden">{displayName}</div>
          {/* first column - thumbnails of imgs and view window for selected img */}
          <div className="flex flex-col items-center sm:w-1/2 lg:flex-row">
            <ProductThumbnails product={productShown} active={attrsForSelectedColor} setActive={setAttrsForSelectedColor} />
            <div className="relative order-1 mb-4 flex w-full items-start justify-center lg:order-2 lg:w-5/6">
              {attrsForSelectedColor.stockNum == 0 && (
                <div className="absolute right-0 left-0 bottom-[50%] z-20 mx-4 flex skew-y-[-15deg] justify-center bg-base-200/60 py-4 text-4xl font-bold">
                  Out of stock
                </div>
              )}
              {/* view window */}
              <img
                className={`${
                  attrsForSelectedColor.stockNum == 0 ? 'opacity-40 grayscale' : 'grayscale-0'
                } w-1/3 sm:w-4/5`}
                src={attrsForSelectedColor.image}
                alt=""
              />
            </div>
          </div>
          {/* second column - product's info and available options */}
          <div className="flex w-full sm:w-1/2">
            <div className="flex w-full flex-col lg:w-4/6">
              <div className="my-2 hidden text-xl text-accent-content sm:block">{brand}</div>
              <div className="hidden text-2xl font-bold text-primary sm:block">
                {displayName}
              </div>
              <div className="mt-2 ml-0 text-xl text-black sm:mt-5 lg:my-5 lg:ml-4">{`$${price}.00`}</div>
              {/* stocks info */}
              <StockDisplayAndAdd
                stockNum={attrsForSelectedColor.stockNum}
                qtyToAdd={qtyToAdd}
                setQtyToAdd={setQtyToAdd}
                qtyBoxChgHandler={qtyBoxChgHandler}
                btnClickHandler={btnClickHandler}
              />
              <ul className="mt-4 flex items-center sm:mt-14">
                <span className="text-sm sm:text-lg">Color </span>
                {/* color options */}
                {colors &&
                  colors.map((color, index) => (
                    <li
                      key={index}
                      className={`${boxStyle} ${
                        attrsForSelectedColor.color == color
                          ? 'border-1 border-success bg-success/50 shadow'
                          : 'shadow-none transition-all duration-[200]'
                      }`}
                      onClick={() => {
                        setAttrsForSelectedColor((draft) => {
                          draft.color = color;
                          draft.image = imageUrls[color]['thumbnail'];
                          draft.stockNum = stocks[color][draft.size];
                        });
                        setQtyToAdd(1);
                      }}
                    >
                      {color}
                    </li>
                  ))}
              </ul>
              {/* size options */}
              <ul className="mt-4 flex items-center sm:mt-6">
                <span className="text-sm sm:text-lg">Size </span>
                {sizes.map((size, index) => (
                  <ProductPageSizeBox
                    key={index}
                    stocks={stocks}
                    active={attrsForSelectedColor}
                    setActive={setAttrsForSelectedColor}
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

export default Product;
