import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product, subCatDisplayNameMap } from '@/src/types';
import Breadcrumbs from './Breadcrumbs';
import BrandFilter from './Brand-filter';
import ProductCard from './Product-card';
import PriceFilter from './Price-filter';

type CategoryProps = {
  categoryName: string;
  fullProducts: Product[];
}
const Category = ({ categoryName, fullProducts }: CategoryProps) => {
  const [chosenBrands, setChosenBrands] = useState<string[]>([] as string[]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  return (
    <motion.main
      key={categoryName}
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
      <Breadcrumbs />
      {/* First column - brand and price filter */}
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
      {/* Second column - Products */}
      <div className="col-span-5 col-start-1 row-start-3 my-4 sm:col-start-2 sm:row-start-2 sm:mt-0 sm:pl-6 md:col-span-4 md:col-start-2 ">
        <h1 className="p-2 text-2xl sm:p-5">
          {subCatDisplayNameMap[categoryName]['displayName']}
        </h1>
        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
            { chosenBrands.length == 0  
              ? fullProducts                                            // when brand filter is unset
                .filter((pdt) => {
                  return minPrice == 0 && maxPrice == 0  
                    ? true                                              // when price filter is unset
                    : pdt.price >= minPrice && pdt.price <= maxPrice;   // when price filter is set
                })
                .map((pdt, i) => <ProductCard key={i} card={pdt} chosenBrands={chosenBrands.length} />)
              : fullProducts
                  .filter((pdt) => {
                    return minPrice == 0 && maxPrice == 0               
                      ? chosenBrands.includes(pdt.brand)                // when price filter is unset
                      : chosenBrands.includes(pdt.brand) &&             // when price filter is set
                        pdt.price >= minPrice && pdt.price <= maxPrice;
                  })
                  .map((pdt, i) => <ProductCard key={i} card={pdt} chosenBrands={chosenBrands.length} />)
              }
        </section>
      </div>
    </motion.main>
  )
}

export default Category;