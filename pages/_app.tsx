import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from "@apollo/client";
import { Elements } from '@stripe/react-stripe-js';
import { Provider as JotaiProvider, atom } from 'jotai';
import { stripePromise } from '@/src/utils/stripe.utils';
import './styles/globals.css';
import Layout from '../components/Layout';
import { Noto_Sans_HK } from 'next/font/google';
import client from "@/src/utils/apollo.utils";
import Spinner from "@/components/Spinner";

const Noto = Noto_Sans_HK({
  weight:['100', '300', '500', '700'],
  variable: '--my-font',
  subsets: ['latin']
})

export const cartOpenAtom = atom(false);

export default function App({ Component, pageProps }: AppProps) {
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [])
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <Elements stripe={stripePromise}>
          <style jsx global>{`
          body {
            font-family: ${Noto.style.fontFamily}, system-ui, sans-serif
          }
        `}</style>
          <JotaiProvider>
            <Layout>
              {loading && <Spinner />}
              <Component {...pageProps} />
            </Layout>
          </JotaiProvider>
        </Elements>
      </ApolloProvider>
    </CookiesProvider>
  )
}