import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard/product-card.component';
import { selectCategoriesMap } from '../store/category/categories.selector';
import { Product, UseParams } from '../types';

const ProductsDisplay: React.FC = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const { category } = useParams<keyof UseParams>() as UseParams;
  const [products, setProducts] = React.useState<Product[]>(categoriesMap['men-shirts']);

  React.useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <main key="men-shirts">
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
        {products && products.map((product, index) => <ProductCard key={index} card={product} />)}
      </section>
    </main>
  );
};

export default ProductsDisplay;
