import * as React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/breadcrumbs';
import FilterPanel from '../components/filter-panel';
import Footer from '../components/footer';

const ShopLayout: React.FC = () => {
  return (
    <>
      <motion.main
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
        className="main-container grid grid-cols-5 grid-rows-shop-layout px-4 xl:px-0"
      >
        <Breadcrumbs />
        <div className="relative top-0 col-span-full col-start-1 row-start-2 sm:col-span-1 sm:block">
          <div className="sticky top-[36px] lg:top-[52px]">
            <h1 className="border-b border-base-300 p-2 text-xl sm:p-5 sm:text-2xl">Filters</h1>
            <FilterPanel title="Brand" />
            <FilterPanel title="Price" />
          </div>
        </div>
        <div className="col-span-5 col-start-1 row-start-3 overflow-y-scroll sm:col-start-2 sm:row-start-2 sm:pl-6 md:col-span-4 md:col-start-2 ">
          <Outlet />
        </div>
      </motion.main>
      <Footer isFixed={false} />
    </>
  );
};

export default ShopLayout;
