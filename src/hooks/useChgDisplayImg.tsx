import * as React from 'react';

const useChgDisplayImg = () => {
  const imgRef = React.useRef<HTMLImageElement>(null);

  const chgDisplayImgHandler: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const tgt = e.target as HTMLImageElement;
    imgRef.current?.setAttribute('src', tgt.getAttribute('src') as string);
  };

  return { imgRef, chgDisplayImgHandler };
};

export default useChgDisplayImg;
