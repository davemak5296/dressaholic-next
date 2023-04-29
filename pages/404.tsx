import * as React from 'react';
import Footer from '@/components/Footer';
import useFooterFixed from '@/src/hooks/useFooterFixed';

const Custom404 = () => {
  const { isFooterFixed, mainRef } = useFooterFixed();
  return (
    <>
      <main ref={mainRef} className="main-container px-4 xl:px-0">
        <h1 className="pt-10 text-[84px] text-base-200">404</h1>
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      </main>
      <Footer isFixed={isFooterFixed}></Footer>
    </>
  );
};
export default Custom404;
