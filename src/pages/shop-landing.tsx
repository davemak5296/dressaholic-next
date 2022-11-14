import { motion } from 'framer-motion';
import * as React from 'react';
import DirectoryItem from '../components/DirectoryItem/directory-item.component';
import directoryItems from '../components/DirectoryItem/directory-item.data';
import Footer from '../components/footer';
import useFooterFixed from '../hooks/useFooterFixed';

type ShopLandingProps = {
  category: 'Men' | 'Women';
};

const ShopLanding: React.FC<ShopLandingProps> = ({ category }) => {
  const { isFooterFixed, mainRef } = useFooterFixed();
  return (
    <>
      <motion.main
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
          duration: 0.5,
        }}
        ref={mainRef}
        className="main-container mb-12 px-4"
      >
        <h1 className="py-8 text-3xl">For {category}</h1>
        <section className="grid grid-cols-4">
          {directoryItems.map(
            (item) => item.mainCategory == category && <DirectoryItem key={item.id} item={item} />
          )}
        </section>
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default ShopLanding;
