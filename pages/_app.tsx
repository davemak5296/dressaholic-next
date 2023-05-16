import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from "@apollo/client";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/src/utils/stripe.utils';
import { store } from '@/store/store'
import './styles/globals.css';
import Layout from '../components/Layout';
import { Noto_Sans_HK } from 'next/font/google';
import client from "@/src/utils/apollo.utils";
// import { PersistGate } from "redux-persist/integration/react";

const Noto = Noto_Sans_HK({
  weight:['100', '300', '500', '700'],
  variable: '--my-font',
  subsets: ['latin']
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <CookiesProvider>
          <ApolloProvider client={client}>
            <Elements stripe={stripePromise}>
              <style jsx global>{`
              body {
                font-family: ${Noto.style.fontFamily}, system-ui, sans-serif
              }
            `}</style>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Elements>
          </ApolloProvider>
        </CookiesProvider>
      {/* </PersistGate> */}
    </Provider>
  )
}