import * as React from 'react';

const useImgLoad = () => {
  const imgOnloadHandler = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const tgt = e.target as HTMLImageElement;
    if (tgt.getAttribute('src') == '/gray-sm.png' || tgt.getAttribute('src') == '/gray.png') {
      tgt.setAttribute('src', tgt.getAttribute('data-src') as string);
    }
  };

  return { imgOnloadHandler };
};

export default useImgLoad;
