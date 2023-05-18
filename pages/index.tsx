import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import NavBar from "@/components/Nav-bar";
import Footer from "@/components/Footer";
import BigMenu from "@/components/Big-menu";
import Carousel from "@/components/Carousel";
import useNavbarHeight from '@/src/hooks/useNavbarHeight';

const dataSource = ['./landing-carousel-1.jpg', './landing-carousel-2.jpg'];

type HomePageProps = {
  isAuth: boolean;
}

export const getServerSideProps: GetServerSideProps<HomePageProps>= async ({req}) => {
  const isAuth = req.cookies.user ? true : false;
  return { props: { isAuth } };
}
export default function HomePage( { isAuth }: HomePageProps) {
  const { scrollH } = useNavbarHeight();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      <motion.main
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <div className="main-container flex max-h-[calc(100vh-64px)] items-center overflow-hidden object-cover">
          <div className="relative max-h-[calc(100vh-64px)]">
            <Carousel dataSource={dataSource} />
          </div>
        </div>
        <BigMenu />
      </motion.main>
      <Footer />
    </div>
  )
}
