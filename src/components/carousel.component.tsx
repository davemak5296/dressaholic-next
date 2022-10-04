import * as React from 'react';

const Carousel: React.FC = () => {
  const loadHandler = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.setAttribute('src', e.target.getAttribute('data-src') as string);
      console.log('loaded');
    }
  };

  return (
    <div className="mx-auto mt-[46px] flex max-h-[calc(100vh-64px)] items-center overflow-hidden object-cover sm:mt-[64px] lg:mt-[72px] xl:container">
      <div className="relative max-h-[calc(100vh-64px)]">
        {/* control buttons in bottom left corner */}
        <div className="absolute left-6 bottom-8 z-10 flex w-[100px] justify-evenly md:w-[200px]">
          <a
            className="mr-2 h-1 w-1/3 border border-solid border-slate-300 bg-slate-300"
            href="#slide-1"
          ></a>
          <a
            className="mr-2 h-1 w-1/3 border border-solid border-slate-300 bg-slate-300"
            href="#slide-2"
          ></a>
        </div>
        {/* slides */}
        <div className="flex items-center overflow-hidden scroll-smooth">
          <div id="slide-1" className="relative w-full shrink-0">
            <div className="absolute left-6 top-16 flex max-w-[35%] flex-wrap sm:top-24 md:top-40 lg:top-48">
              <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl">Masterpiece</h1>
              <p className="pl-4 pt-4 text-sm sm:pl-6 sm:pt-6 sm:text-xl md:pl-8 lg:pt-10 lg:text-3xl">
                Highly-perfected clothes, designed for life&apos;s needs.
              </p>
            </div>
            <img
              // src="./placeholder.png"
              src="./landing-carousel-1.jpg"
              // data-src="./landing-carousel-1.jpg"
              alt=""
              // onLoad={loadHandler}
            />
          </div>
          <div id="slide-2" className="relative w-full shrink-0">
            <div className="absolute top-20 left-0 right-0 mx-auto flex max-w-full flex-wrap text-white sm:top-24 md:top-40 lg:top-48">
              <h1 className="flex w-full shrink-0 justify-center text-xl sm:text-3xl md:text-5xl lg:text-7xl">
                Grand Opening Sale
              </h1>
              <p className="flex w-full justify-center pt-4 text-sm sm:pt-6 sm:text-xl lg:pt-10 lg:text-3xl">
                20% off on any purchase
              </p>
            </div>
            <img
              // src="./placeholder.png"
              src="./landing-carousel-2.jpg"
              // data-src="./landing-carousel-2.jpg"
              alt=""
              // onLoad={loadHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
