import * as React from 'react';
import BigMenu from '../components/big-menu';
import Carousel from '../components/carousel.component';

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      <BigMenu />
    </>
  );
};

export default Home;
