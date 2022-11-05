import * as React from 'react';
import { Route, Routes } from 'react-router';
import Footer from '../components/footer';
import Category from './Category';
import ProductPage from './product-page';
import ShopLanding from './shop-landing';
import ShopLayout from './shop-layout';

const Shop: React.FC = () => {
  return (
    <Routes>
      <Route element={<ShopLayout />}>
        <Route index element={<ShopLanding />} />
        <Route path=":category" element={<Category />} />
      </Route>
      <Route path=":category/:skuInUrl" element={<ProductPage />} />
    </Routes>
  );
};

export default Shop;
