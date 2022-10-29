import * as React from 'react';

type SlideProps = {
  imageUrl: string;
  captions: React.ReactNode | null;
  index: number;
  currIndex: number;
};

const Slide: React.FC<SlideProps> = ({ index, imageUrl, currIndex, captions }) => {
  return (
    <>
      {captions}
      <img
        src={imageUrl}
        className={`${
          index == currIndex ? 'left-0' : 'left-[100vw] xl:left-[1280px]'
        } absolute top-0 bottom-0 h-full w-full object-cover transition-all`}
      />
    </>
  );
};

export default Slide;
