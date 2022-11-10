import * as React from 'react';
import { Route, Routes } from 'react-router';
import Category from './Category';
import ProductPage from './product-page';
import ShopLanding from './shop-landing';

const Shop: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ShopLanding />} />
      <Route path=":category" element={<Category />} />
      <Route path=":category/:skuInUrl" element={<ProductPage />} />
    </Routes>
  );
};

export default Shop;
