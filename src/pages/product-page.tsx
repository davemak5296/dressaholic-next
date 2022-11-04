import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useImmer } from 'use-immer';
import validator from 'validator';

import ProductPageSizeBox from '../components/product-page-size-box.component';
import { selectCategoriesMap } from '../store/category/categories.selector';
import { Product, UseParamsCategoryType, UseParamsSkuType, SizeType } from '../types';
import { ReactComponent as PlusSign } from '../assets/square-plus-regular.svg';
import { ReactComponent as MinusSign } from '../assets/square-minus-regular.svg';
import Breadcrumbs from '../components/breadcrumbs';
import Footer from '../components/footer';

export type ActiveType = {
  color: string;
  size: SizeType;
  image: string;
  stockNum: number;
  colorBox: number;
};
const boxStyle = 'mx-2 cursor-pointer border border-solid border-slate-200 px-3 py-1 first:ml-0';
const sizes: SizeType[] = ['sm', 'md', 'lg', 'xl'];

const ProductPage: React.FC = () => {
  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const { skuInUrl } = useParams<keyof UseParamsSkuType>() as UseParamsSkuType;
  const [product, setProduct] = React.useState<Product>({} as Product);
  const { sku, brand, displayName, colors, imageUrls, stocks, price } = product;
  const [qtyToAdd, setQtyToAdd] = React.useState<number | string>(1);
  const [active, setActive] = useImmer<ActiveType>({
    color: '',
    size: 'sm',
    image: '',
    stockNum: 0,
    colorBox: 0,
  });

  const categoriesMap = useSelector(selectCategoriesMap);
  const isEmpty = (object: object) => Object.keys(object).length == 0;

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
      <main key={skuInUrl} className="main-container px-4">
        <Breadcrumbs />
        <div className="grid grid-cols-product-page py-4">
          <div className="flex">
            <div className="m-2 mt-0 w-1/6">
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
                        } mb-2 cursor-pointer border-solid p-2 last:mb-0`}
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
            <div className="relative flex w-5/6 items-start justify-center">
              {active.stockNum == 0 && (
                <div className="absolute right-0 left-0 bottom-[50%] z-20 mx-4 flex skew-y-[-15deg] justify-center bg-base-200/60 py-4 text-4xl font-bold">
                  Out of stock
                </div>
              )}
              <img
                className={`${
                  active.stockNum == 0 ? 'opacity-40 grayscale' : 'grayscale-0'
                }  w-4/5`}
                src={active.image}
                alt=""
              />
            </div>
          </div>

          <div className="flex">
            <div className="flex w-4/6 flex-col">
              <div className="mt-6 mb-2 text-2xl text-accent-content">{brand}</div>
              <div className="mb-3 text-3xl font-bold text-primary">{displayName}</div>
              <div className="my-5 ml-4 text-2xl text-black">{`$${price}.00`}</div>
              <div className="mb-1 mt-auto text-lg">Color</div>
              <ul className="flex">
                {colors &&
                  colors.map((color, index) => (
                    <li
                      key={index}
                      className={`${boxStyle} ${
                        active.colorBox == index
                          ? 'border-1 border-success bg-success/50 shadow'
                          : 'shadow-none'
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
              <div className="mt-5 mb-1 text-lg">Size</div>
              <ul className="flex">
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
            <div className="flex h-full w-2/6 items-center">
              <div className="flex w-full flex-col border border-solid border-primary">
                <p className="mx-auto mt-4">
                  <span className="mx-auto my-4 text-lg text-secondary-focus underline underline-offset-4">
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
                {/* {qtyToAdd == '' && (
              <p className="mx-auto text-sm text-red-500">Please buy at least 1</p>
            )} */}
                <div className="my-6 flex">
                  <PlusSign
                    className="h-8 w-8 cursor-pointer"
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
                    className="w-[calc(100%-2*32px)] text-center text-xl outline-none"
                    onChange={(e) => {
                      const str = e.target.value;
                      if (validator.isNumeric(str)) {
                        if (str == '0') return setQtyToAdd(1); //when input 0, set to 1

                        return active.stockNum >= parseInt(str)
                          ? setQtyToAdd(parseInt(str))
                          : setQtyToAdd(active.stockNum); // when input > stockNum, keep unchange
                      } else {
                        setQtyToAdd(''); // when input is not number, clear
                      }
                    }}
                    value={qtyToAdd}
                  />
                  <MinusSign
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => {
                      setQtyToAdd((prev) => {
                        if (typeof prev == 'number') {
                          return prev > 1 ? prev - 1 : prev;
                        }
                        return 1; // when input is empty, set to 1
                      });
                    }}
                  />
                </div>
                <button
                  className={`${
                    active.stockNum == 0 || qtyToAdd == ''
                      ? 'daisy-btn-active daisy-btn-ghost '
                      : 'daisy-btn-primary'
                  } px-8 py-4 uppercase shadow-xl`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer isFixed={true} />
    </>
  );
};

export default ProductPage;
