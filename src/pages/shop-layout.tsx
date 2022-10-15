import * as React from 'react';
import { Outlet } from 'react-router';
import Breadcrumbs from '../components/breadcrumbs';
import FilterPanel from '../components/filter-panel';

const ShopLayout: React.FC = () => {
  return (
    <main className="main-container grid grid-cols-5 grid-rows-shop-layout px-4 xl:px-0">
      <Breadcrumbs />
      <div className="relative top-0 col-span-1 row-start-2 hidden md:block">
        <div className="sticky top-[36px] lg:top-[52px]">
          <h1 className="border-b border-base-300 p-5 text-2xl">Filters</h1>
          <FilterPanel title="Category" />
          <FilterPanel title="Brand" />
          <FilterPanel title="Price" />
        </div>
      </div>
      <div className="col-span-5 col-start-1 row-start-2 overflow-y-scroll pl-4 md:col-span-4 md:col-start-2 ">
        <Outlet />
      </div>
    </main>
  );
};

export default ShopLayout;
