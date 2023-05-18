import type { AppProps } from "next/app";
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from "@apollo/client";
import { Elements } from '@stripe/react-stripe-js';
import { Provider as JotaiProvider, atom } from 'jotai';
import { stripePromise } from '@/src/utils/stripe.utils';
import './styles/globals.css';
import Layout from '../components/Layout';
import { Noto_Sans_HK } from 'next/font/google';
import client from "@/src/utils/apollo.utils";

const Noto = Noto_Sans_HK({
  weight:['100', '300', '500', '700'],
  variable: '--my-font',
  subsets: ['latin']
})

export const cartOpenAtom = atom(false);

export default function App({ Component, pageProps }: AppProps) {
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
              <Component {...pageProps} />
            </Layout>
          </JotaiProvider>
        </Elements>
      </ApolloProvider>
    </CookiesProvider>
  )
}