import { motion } from 'framer-motion';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import _ from 'lodash';
import Breadcrumbs from '../components/breadcrumbs';
import FilterPanel from '../components/filter-panel';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard/product-card.component';
import useFooterFixed from '../hooks/useFooterFixed';
import { selectCategoriesMap } from '../store/category/categories.selector';
import { Product, UseParamsCategoryType, subCatDisplayNameMap } from '../types';

const Category: React.FC = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const { isFooterFixed, mainRef } = useFooterFixed();
  const [products, setProducts] = React.useState<Product[]>([] as Product[]);
  const [chosenBrands, setChosenBrands] = React.useState<string[]>([] as string[]);

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
        className="main-container grid grid-cols-5 grid-rows-shop-layout px-4 xl:px-0"
      >
        <Breadcrumbs />
        <div className="relative top-0 col-span-full col-start-1 row-start-2 sm:col-span-1 sm:block">
          <div className="sticky top-[36px] lg:top-[52px]">
            <h1 className="border-b border-base-300 p-2 text-xl sm:p-5 sm:text-2xl">Filters</h1>
            <FilterPanel
              activeBrands={chosenBrands}
              setChosenBrands={setChosenBrands}
              title="Brand"
            />
            <FilterPanel
              activeBrands={chosenBrands}
              setChosenBrands={setChosenBrands}
              title="Price"
            />
          </div>
        </div>
        <div className="col-span-5 col-start-1 row-start-3 overflow-y-scroll sm:col-start-2 sm:row-start-2 sm:pl-6 md:col-span-4 md:col-start-2 ">
          <h1 className="p-2 text-2xl sm:p-5">{subCatDisplayNameMap[category]['displayName']}</h1>
          <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
            {products
              ? chosenBrands.length == 0
                ? products.map((product, index) => <ProductCard key={index} card={product} />)
                : products
                    .filter((product) => chosenBrands.includes(product.brand))
                    .map((product, index) => <ProductCard key={index} card={product} />)
              : null}
          </section>
        </div>
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Category;
