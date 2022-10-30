import * as React from 'react';
import { ReactComponent as LeftArrow } from '../assets/angle-left-solid.svg';
import { ReactComponent as RightArrow } from '../assets/angle-right-solid.svg';
import Slide from './Slide.component';

type CarouselProp = {
  dataSource: string[];
};

const slideOneCaptions = (
  <div className="absolute left-6 top-16 z-20 flex max-w-[35%] flex-wrap sm:top-24 md:top-40 lg:top-48">
    <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl">Masterpiece</h1>
    <p className="pl-4 pt-4 text-sm sm:pl-6 sm:pt-6 sm:text-xl md:pl-8 lg:pt-10 lg:text-3xl">
      Highly-perfected clothes, designed for life&apos;s needs.
    </p>
  </div>
);
const slideTwoCaptions = (
  <div className="absolute top-20 left-0 right-0 z-20 mx-auto flex max-w-full flex-wrap text-white sm:top-24 md:top-40 lg:top-48">
    <h1 className="flex w-full shrink-0 justify-center text-xl sm:text-3xl md:text-5xl lg:text-7xl">
      Grand Opening Sale
    </h1>
    <p className="flex w-full justify-center pt-4 text-sm sm:pt-6 sm:text-xl lg:pt-10 lg:text-3xl">
      20% off on any purchase
    </p>
  </div>
);

const captions = [slideOneCaptions, slideTwoCaptions];

const Carousel: React.FC<CarouselProp> = ({ dataSource }) => {
  const [currentIndex, setCurrentIndex] = React.useState(1);

  const getIndexes = () => {
    const prevIndex = currentIndex - 1 < 0 ? dataSource.length - 1 : currentIndex - 1;
    // when the list is exhausted, back to the first item
    const nextIndex = (currentIndex + 1) % dataSource.length;

    return {
      prevIndex,
      nextIndex,
    };
  };

  const handleClickPrev = () => {
    const { prevIndex } = getIndexes();
    setCurrentIndex(prevIndex);
  };

  const handleClickNext = () => {
    const { nextIndex } = getIndexes();
    setCurrentIndex(nextIndex);
  };

  React.useEffect(() => {
    let intervalId = setInterval(() => {
      handleClickNext();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [handleClickNext, handleClickPrev]);

  return (
    <div className={`relative aspect-[3/2] w-[100vw] xl:w-[1280px]`}>
      <div className="relative h-full w-full overflow-hidden">
        {dataSource &&
          dataSource.map((imageUrl, index) => (
            <Slide
              index={index}
              currIndex={currentIndex}
              captions={currentIndex == index ? captions[index] : null}
              imageUrl={imageUrl}
              key={index}
            />
          ))}
      </div>
      {/* arrows for moving back and forth */}
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-between text-white">
        <LeftArrow onClick={handleClickPrev} className="h-6 w-6 cursor-pointer sm:h-10 sm:w-10" />
        <RightArrow onClick={handleClickNext} className="h-6 w-6 cursor-pointer sm:h-10 sm:w-10" />
      </div>
      <section className="absolute left-[50%] top-[80%] z-10 flex h-[66.7vw] translate-x-[-50%] justify-center">
        {/* dots from jumping to different pic */}
        {/* spread the array iterator to an array of consecutive numbers from 0 to dataSource.length-1 */}
        {[...Array(dataSource.length).keys()].map((key, index) => (
          <div
            onClick={() => {
              setCurrentIndex(index);
            }}
            key={key}
            className={`${
              index == currentIndex ? 'bg-black' : 'bg-none'
            } ml-2 h-3 w-3 cursor-pointer rounded-full border border-solid border-black transition-all sm:ml-4 sm:h-4 sm:w-4`}
          ></div>
        ))}
      </section>
    </div>
  );
};

export default Carousel;
