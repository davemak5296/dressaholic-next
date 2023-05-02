import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SignInForm from '@/components/Sign-in-form';
import SignUpForm from '@/components/Sign-up-form';
import Footer from '@/components/Footer';
import useFooterFixed from '@/hooks/useFooterFixed';
import { selectCurrentUser } from '@/src/store/user/user.selector';

const Authentication = () => {
  const { isFooterFixed, mainRef } = useFooterFixed();
  const currUser = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (currUser) {
      router.push('/');
    }
  })

  return (
    !currUser && <>
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
        {/* <SignInForm /> */}
        <SignInForm />
        <SignUpForm />
      </motion.main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default Authentication;
