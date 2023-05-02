import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/src/utils/stripe.utils';
import { store } from '@/store/store'
import './styles/globals.css';
import Layout from '../components/Layout';
import { Noto_Sans } from 'next/font/google';

const Noto = Noto_Sans({
  weight:['100', '300', '500', '700'],
  variable: '--my-font',
  subsets: ['latin']
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}