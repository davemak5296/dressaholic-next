import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import SignInForm from '@/components/Sign-in-form';
import SignUpForm from '@/components/Sign-up-form';
import Footer from '@/components/Footer';
import NavBar from '@/components/Nav-bar';
import useNavbarHeight from '@/src/hooks/useNavbarHeight';

type AuthPageProps = {
  isAuth: boolean;
}

export const getServerSideProps: GetServerSideProps<AuthPageProps>= async ({req}) => {
  const isAuth = req.cookies.user ? true : false;

  return !isAuth
    ? { props: { isAuth } }
    : {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
}

const Authentication = ( { isAuth }: AuthPageProps ) => {
  const { scrollH } = useNavbarHeight();

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar isAuth={isAuth} scrollY={scrollH} />
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
      <Footer />
    </div>
  );
};

export default Authentication;
