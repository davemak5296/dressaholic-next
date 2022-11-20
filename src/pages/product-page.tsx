import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useImmer } from 'use-immer';
import validator from 'validator';
import { motion } from 'framer-motion';
import { Product, UseParamsCategoryType, UseParamsSkuType, SizeType } from '../types';
import { selectCategoriesMap, selectCatIsLoading } from '../store/category/categories.selector';
import useFooterFixed from '../hooks/useFooterFixed';

import ProductPageSizeBox from '../components/product-page-size-box.component';
import Breadcrumbs from '../components/breadcrumbs';
import Footer from '../components/footer';
import { addItemToCart } from '../store/cart/cart.action';
import { selectCartItems } from '../store/cart/cart.selector';
import { SET_IS_CART_OPEN } from '../store/cart/cart.reducer';
import Spinner from '../components/spinner.component';
import StockDisplayAndAdd from '../components/stock-display-add.component';
import ProductThumbnails from '../components/product-thumbnails.component';

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
  const dispatch = useDispatch();
  const categoriesMap = useSelector(selectCategoriesMap);
  const catIsLoading = useSelector(selectCatIsLoading);
  const itemsInCart = useSelector(selectCartItems);

  const [product, setProduct] = React.useState<Product>({} as Product);
  const [qtyToAdd, setQtyToAdd] = React.useState<number | string>(1);
  const [active, setActive] = useImmer<ActiveStateType>({
    color: '',
    size: 'sm',
    image: '',
    stockNum: 0,
    colorBox: 0,
  });
  const { isFooterFixed, mainRef } = useFooterFixed();

  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const { skuInUrl } = useParams<keyof UseParamsSkuType>() as UseParamsSkuType;
  const { sku, brand, displayName, colors, imageUrls, stocks, price } = product;

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

  const btnHandler: React.MouseEventHandler = () => {
    if (active.stockNum == 0 || qtyToAdd == '') return;
    dispatch(SET_IS_CART_OPEN(true));
    dispatch(
      addItemToCart(
        itemsInCart,
        {
          sku,
          brand,
          displayName,
          imageUrl: active.image,
          price,
          color: active.color,
          size: active.size,
          qty: qtyToAdd as number,
        },
        false
      )
    );
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
        {catIsLoading ? (
          <Spinner />
        ) : (
          <>
            <Breadcrumbs />
            <div className="flex flex-col pt-0 pb-2 sm:flex-row sm:py-4">
              <div className="my-2 text-xl text-accent-content sm:hidden">{brand}</div>
              <div className="text-2xl font-bold text-primary sm:hidden">{displayName}</div>
              {/* first column */}
              <div className="flex flex-col items-center sm:w-1/2 lg:flex-row">
                <ProductThumbnails product={product} active={active} setActive={setActive} />
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
                  <div className="hidden text-2xl font-bold text-primary sm:block">
                    {displayName}
                  </div>
                  <div className="mt-2 ml-0 text-xl text-black sm:mt-5 lg:my-5 lg:ml-4">{`$${price}.00`}</div>
                  <StockDisplayAndAdd
                    active={active}
                    qtyToAdd={qtyToAdd}
                    setQtyToAdd={setQtyToAdd}
                    qtyBoxHandler={qtyBoxHandler}
                    btnHandler={btnHandler}
                  />
                  <ul className="mt-4 flex items-center sm:mt-14">
                    <span className="text-sm sm:text-lg">Color </span>
                    {/* colorBox */}
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
          </>
        )}
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default ProductPage;
