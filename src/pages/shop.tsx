import * as React from 'react';
import { Route, Routes, useParams } from 'react-router';
import { allSkus, subCatDisplayNameMap, UseParamsCategoryType, UseParamsSkuType } from '../types';
import Category from './Category';
import NotFound from './not-found';
import ProductPage from './product-page';
import ShopLanding from './shop-landing';

const CategoryWrapper: React.FC = () => {
  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  return Object.keys(subCatDisplayNameMap).includes(category) ? <Category /> : <NotFound />;
};
const ProductPageWrapper: React.FC = () => {
  const { skuInUrl } = useParams<keyof UseParamsSkuType>() as UseParamsSkuType;
  return allSkus.includes(skuInUrl) ? <ProductPage /> : <NotFound />;
};

const Shop: React.FC = () => {
  return (
    <Routes>
      <Route path="men" element={<ShopLanding category="Men" />} />
      <Route path="women" element={<ShopLanding category="Women" />} />
      <Route path=":category" element={<CategoryWrapper />} />
      <Route path=":category/:skuInUrl" element={<ProductPageWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Shop;
