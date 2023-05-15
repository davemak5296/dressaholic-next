import { motion } from 'framer-motion';
import Footer from './Footer';
import directoryItems from '@/src/data/directory-item.data';
import DirectoryItem from './Directory-item';

type ShopLandingProps = {
  category: 'Men' | 'Women';
};

const ShopLanding = ({ category }: ShopLandingProps) => {

  return (
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
      className="main-container mb-12 px-4"
    >
      <h1 className="py-8 text-3xl">For {category}</h1>
      <section className="grid grid-cols-4">
        {directoryItems.map(
          (item) => item.mainCategory == category && <DirectoryItem key={item.id} item={item} />
        )}
      </section>
    </motion.main>

  )
}

export default ShopLanding;