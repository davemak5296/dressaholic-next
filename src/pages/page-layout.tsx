import * as React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../components/navigation-bar';

const PageLayout: React.FC = () => {
  const [scrollH, setScrollH] = React.useState(0);

  const handleScroll: EventListener = () => {
    setScrollH(window.scrollY);
  };
  window.addEventListener('scroll', handleScroll, true);

  return (
    <>
      <Navigation scrollY={scrollH} />
      <Outlet />
    </>
  );
};

export default PageLayout;
