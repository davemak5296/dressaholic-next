import * as React from 'react';
import Footer from '@/components/Footer';

const Custom404 = () => {

  return (
    <div className='flex flex-col min-h-screen'>
      <main className="main-container px-4 xl:px-0">
        <h1 className="pt-10 text-[84px] text-base-200">404</h1>
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      </main>
      <Footer></Footer>
    </div>
  );
};
export default Custom404;
