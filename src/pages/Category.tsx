import { motion } from 'framer-motion';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs';
import BrandFilter from '../components/brand-filter';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard/product-card.component';
import useFooterFixed from '../hooks/useFooterFixed';
import { selectCategoriesMap, selectCatIsLoading } from '../store/category/categories.selector';
import { Product, UseParamsCategoryType, subCatDisplayNameMap } from '../types';
import PriceFilter from '../components/price-filter';
import Spinner from '../components/spinner.component';

const Category: React.FC = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const catIsLoading = useSelector(selectCatIsLoading);
  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const { isFooterFixed, mainRef } = useFooterFixed();
  const [products, setProducts] = React.useState<Product[]>([] as Product[]);
  const [chosenBrands, setChosenBrands] = React.useState<string[]>([] as string[]);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);

  React.useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <motion.main
        ref={mainRef}
        key={category}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.4,
        }}
        className="main-container relative grid grid-cols-5 grid-rows-shop-layout px-4 xl:px-0"
      >
        {catIsLoading ? (
          <Spinner />
        ) : (
          <>
            <Breadcrumbs />
            <div className="relative top-0 col-span-full col-start-1 row-start-2 sm:col-span-1 sm:block">
              <div className="sticky top-[36px] lg:top-[52px]">
                <h1 className="border-b border-base-300 p-2 text-xl sm:p-5 sm:text-2xl">Filters</h1>
                <BrandFilter setChosenBrands={setChosenBrands} />
                <PriceFilter
                  min={minPrice}
                  max={maxPrice}
                  setMin={setMinPrice}
                  setMax={setMaxPrice}
                />
              </div>
            </div>
            <div className="col-span-5 col-start-1 row-start-3 my-4 overflow-y-scroll sm:col-start-2 sm:row-start-2 sm:mt-0 sm:pl-6 md:col-span-4 md:col-start-2 ">
              <h1 className="p-2 text-2xl sm:p-5">
                {subCatDisplayNameMap[category]['displayName']}
              </h1>
              <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
                {products
                  ? // when brand filters are not chosen
                    chosenBrands.length == 0
                    ? products
                        .filter((pdt) => {
                          return minPrice == 0 && maxPrice == 0
                            ? true
                            : pdt.price >= minPrice && pdt.price <= maxPrice;
                        })
                        .map((pdt, i) => <ProductCard key={i} card={pdt} />)
                    : products
                        .filter((pdt) => {
                          return minPrice == 0 && maxPrice == 0
                            ? chosenBrands.includes(pdt.brand)
                            : chosenBrands.includes(pdt.brand) &&
                                pdt.price >= minPrice &&
                                pdt.price <= maxPrice;
                        })
                        .map((pdt, i) => <ProductCard key={i} card={pdt} />)
                  : null}
              </section>
            </div>
          </>
        )}
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Category;
