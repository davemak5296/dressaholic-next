import * as React from 'react';
import { motion } from 'framer-motion';
import SignInForm from '../components/SignInForm/sign-in-form.component';
import SignUpForm from '../components/SignUpForm/sign-up-form.components';
import Footer from '../components/footer';
import useFooterFixed from '../hooks/useFooterFixed';

const Authentication: React.FC = () => {
  const { isFooterFixed, mainRef } = useFooterFixed();
  // const [isFooterFixed, setIsFooterFixed] = React.useState(true);
  // const mainRef = React.useRef<HTMLElement>(null);

  // const setFooter = (mainRef: React.RefObject<HTMLElement>) => {
  //   if (mainRef == null) return;
  //   const mainH = mainRef.current?.clientHeight as number;
  //   window.innerHeight - 184 < mainH ? setIsFooterFixed(false) : setIsFooterFixed(true);
  // };
  // React.useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     setFooter(mainRef);
  //   });
  //   return () => {
  //     window.removeEventListener('size', () => setFooter(mainRef));
  //   };
  // }, []);

  // React.useEffect(() => {
  //   let intervalId = setInterval(() => {
  //     window.dispatchEvent(new Event('resize'));
  //   });
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  return (
    <>
      <motion.main
        ref={mainRef}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.3,
        }}
        className="main-container flex w-full flex-col items-center py-4 lg:h-[calc(100vh-180px)] lg:w-[850px] lg:flex-row lg:items-start lg:justify-between"
      >
        <SignInForm />
        <SignUpForm />
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Authentication;
