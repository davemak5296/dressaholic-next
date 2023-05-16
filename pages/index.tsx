import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { ApolloError, gql } from '@apollo/client';
import client from '@/src/utils/apollo.utils';
import NavBar from "@/components/Nav-bar";
import Footer from "@/components/Footer";
import BigMenu from "@/components/Big-menu";
import Carousel from "@/components/Carousel";
import useNavbarHeight from '@/src/hooks/useNavbarHeight';
import { db } from "@/src/utils/firebase/firebase.utils";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const dataSource = ['./landing-carousel-1.jpg', './landing-carousel-2.jpg'];

type HomePageProps = {
  isAuth: boolean;
  // cookie: Partial<{
  //   [key: string]: string;
  // }>
  // data: any;
  // error: ApolloError | null
}

type skuType = {
  sku: string;
  price: number;
  quantity: number;
}
export const getServerSideProps: GetServerSideProps<HomePageProps>= async ({req}) => {
  const isAuth = req.cookies.user ? true : false;
  console.log(`current user is ${req.cookies.user}`)

  const cartDocRef = doc(db, 'cart', 'OhdsjIrLSlcFrnx4SISffJUcp6q2');
  // const cartSnapShot = await getDoc(cartDocRef);
  // const currCart = cartSnapShot.data()?.cart as skuType[];

  // await setDoc(cartDocRef, {
  //   cart: [
  //     {
  //       "sku": "M-JE-001",
  //       "brand": "Haggar",
  //       "displayName": "Non Iron Pant",
  //       "imageUrl": "https://i.ibb.co/yfHjDFL/M-JE-001-tan-thumbnail.jpg",
  //       "price": 159,
  //       "color": "tan",
  //       "size": "sm",
  //       "qty": 1
  //     }
  //   ]
  // })
  // console.log(`cart is update!`);

  // const cartDocRef = doc(db, 'cart', 'testuser1');
  // const cartSnapShot = await getDoc(cartDocRef);
  // const currCart = cartSnapShot.data()?.cart as skuType[];


  // const cookie = context.req.cookies;

  // const userCookie = context.req.cookies.user;
  // const res = await fetch('http://localhost:3000/api/graphql');
  // const data: string = await res.text();
  // const { data, error } = await client.query({
  //   query: gql`
  //     query {
  //       testNull
  //     }
  //   `
  // })
  // console.log(`data is ${JSON.stringify(data, null, 2)}`);
  return { props: { isAuth } };
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
