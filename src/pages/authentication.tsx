import * as React from 'react';
import { motion } from 'framer-motion';
import SignInForm from '../components/SignInForm/sign-in-form.component';
import SignUpForm from '../components/SignUpForm/sign-up-form.components';

const Authentication: React.FC = () => {
  return (
    <motion.main
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
  );
};

export default Authentication;
