import * as React from 'react';
import { motion } from 'framer-motion';
import BigMenu from '../components/big-menu';
import Carousel from '../components/carousel.component';

const Home: React.FC = () => {
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
    >
      <Carousel />
      <BigMenu />
    </motion.main>
  );
};

export default Home;
