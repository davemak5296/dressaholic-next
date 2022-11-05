import * as React from 'react';

const useFooterFixed = () => {
  const [isFooterFixed, setIsFooterFixed] = React.useState(true);
  const mainRef = React.useRef<HTMLElement>(null);

  const setFooter = (mainRef: React.RefObject<HTMLElement>) => {
    if (mainRef == null) return;
    const mainH = mainRef.current?.clientHeight as number;
    window.innerHeight - 184 < mainH ? setIsFooterFixed(false) : setIsFooterFixed(true);
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setFooter(mainRef);
    });
    return () => {
      window.removeEventListener('size', () => setFooter(mainRef));
    };
  }, []);

  React.useEffect(() => {
    let intervalId = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    });
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { isFooterFixed, mainRef };
};
export default useFooterFixed;
