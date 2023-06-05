import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import SignInForm from '@/components/Sign-in-form';
import SignUpForm from '@/components/Sign-up-form';
import Footer from '@/components/Footer';
import NavBar from '@/components/Nav-bar';
import useNavbarHeight from '@/src/hooks/useNavbarHeight';
import generateCsrfToken from '@/src/utils/csrf';
import { verifyAuthStatus } from '@/src/utils/verifyAuthStatus';
import { serialize } from 'cookie';

type AuthPageProps = {
  isAuth: boolean;
  prev: string | false;
  csrf: string
}

export const getServerSideProps: GetServerSideProps<AuthPageProps>= async ({req, res}) => {
  let { csrf , session } = req.cookies;
  if (!csrf) {
    csrf = generateCsrfToken();
    const expiresIn = 60*60;
    res.setHeader('Set-Cookie', serialize('csrf', csrf, { path: '/', maxAge: expiresIn }))
  }
  const { isAuth } = await verifyAuthStatus(csrf, session);
  const prev = req.cookies.prev ?? false;

  return !isAuth
    ? { props: { isAuth, prev, csrf } }
    : {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
}

const Authentication = ( { isAuth, prev, csrf }: AuthPageProps ) => {
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
        <SignInForm csrf={csrf} prev={prev} />
        <SignUpForm csrf={csrf} prev={prev} />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Authentication;
