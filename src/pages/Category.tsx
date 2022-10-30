import { motion } from 'framer-motion';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard/product-card.component';
import { selectCategoriesMap } from '../store/category/categories.selector';
import { Product, UseParams, subCatDisplayNameMap } from '../types';

const Category: React.FC = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const { category } = useParams<keyof UseParams>() as UseParams;
  const [products, setProducts] = React.useState<Product[]>([] as Product[]);

  React.useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <motion.main
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
    >
      <h1 className="p-2 text-2xl sm:p-5">{subCatDisplayNameMap[category]['displayName']}</h1>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-6">
        {products && products.map((product, index) => <ProductCard key={index} card={product} />)}
      </section>
    </motion.main>
  );
};

export default Category;
