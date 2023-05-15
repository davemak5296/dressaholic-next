import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { ApolloError, gql } from '@apollo/client';
import client from '@/src/utils/apollo.utils';
import NavBar from "@/components/Nav-bar";
import Footer from "@/components/Footer";
import BigMenu from "@/components/Big-menu";
import Carousel from "@/components/Carousel";
import useNavbarHeight from '@/src/hooks/useNavbarHeight';
// import { Data } from "./api/graphql";

const dataSource = ['./landing-carousel-1.jpg', './landing-carousel-2.jpg'];

type HomePageProps = {
  isAuth: boolean;
  // cookie: Partial<{
  //   [key: string]: string;
  // }>
  // data: any;
  // error: ApolloError | null
}

export const getServerSideProps: GetServerSideProps<HomePageProps>= async ({req}) => {
  const isAuth = req.cookies.user ? true : false;
  return { props: { isAuth } };
  // const cookie = context.req.cookies;

  // const userCookie = context.req.cookies.user;
  // const res = await fetch('http://localhost:3000/api/graphql');
  // const data: string = await res.text();
  // const { data, error } = await client.query({
  //   query: gql`
  //     query GetUsers {
  //       user {
  //         id
  //         name
  //         email
  //       }
  //     }
  //   `
  // })
  // const aError = error instanceof ApolloError ? error : null
  // console.log(`data is ${JSON.stringify(data, null, 2)}`);
  // console.log(`error is ${JSON.stringify(aError, null, 2)}`);

  // return !userCookie
  //   ? {
  //     props: {
  //       isAuth: false,
  //       cookie: cookie,
  //       data: data,
  //       // error: error as ApolloError
  //       error: aError
  //     } 
  //   }
  //   : {
  //     props: {
  //       isAuth: true,
  //       cookie: cookie,
  //       data: data,
  //       error: aError
  //       // error: error
  //     } 
  //   }
}
export default function HomePage( { isAuth }: HomePageProps) {
  const { scrollH } = useNavbarHeight();

  // console.log(JSON.stringify(cookie, null, 2))
  // console.log(`gql error: ${JSON.stringify(error, null, 2)}`)
  // console.log(`gql data is ${JSON.stringify(data, null, 2)}`);
  // console.log(`gql error is ${JSON.stringify(error, null, 2)}`);

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
