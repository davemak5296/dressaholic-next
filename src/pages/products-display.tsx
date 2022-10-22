import * as React from 'react';
import ProductCard from '../components/ProductCard/product-card.component';
import { Product } from '../types';
import data from './shop-data.json';

const testProduct: Product = {
  sku: 'M-AC-001',
  displayName: "Men's Gait Half Zip Jacket",
  brand: 'Spyder',
  descriptions: 'good',
  price: 123,
  colors: ['red', 'black'],
  stocks: {
    red: {
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
    },
    black: {
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
    },
  },
  imageUrls: {
    red: {
      thumbnail: 'https://i.ibb.co/bXCTjty/M-SH-001-blue-thumbnail.jpg',
      one: '/test-red-one.jpg',
      two: '/test-red-two.jpg',
    },
    black: {
      thumbnail: 'https://i.ibb.co/C6Tm0wg/M-SH-001-green-thumbnail.jpg',
      one: '/test-black-one.jpg',
      two: '/test-black-two.jpg',
    },
  },
};
const ProductsDisplay: React.FC = () => {
  console.log(data);
  return (
    <main>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
        <ProductCard card={testProduct} />
      </section>
    </main>
  );
};

export default ProductsDisplay;
