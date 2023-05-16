import { useSelector } from 'react-redux';
import Link from 'next/link';
import clsx from 'clsx';
import Footer from '@/components/Footer';
import { selectCartItems, selectCartTotal } from '@/store/cart/cart.selector';
import CartItem from '@/components/Cart-item';
import { GetServerSideProps } from 'next';
import NavBar from '@/components/Nav-bar';
import useNavbarHeight from '@/src/hooks/useNavbarHeight';
import { useCookies } from 'react-cookie';
import { gql, useQuery } from '@apollo/client';
import { GET_CART_ITEM } from '@/components/Cart-dropdown';
import client from '@/src/utils/apollo.utils';
import ClientOnly from '@/components/ClientOnly';
import Spinner from '@/components/Spinner';

type CartPageProps = {
  isAuth: boolean;
}
export const getServerSideProps: GetServerSideProps<CartPageProps>= async ({req}) => {
  const isAuth = req.cookies.user ? true : false;
  return { props: { isAuth }};
}

const colTitleStyles = clsx('bg-secondary text-secondary-content text-base lg:text-lg pl-1');

const Cart = ( { isAuth }: CartPageProps ) => {
  const { scrollH } = useNavbarHeight();
  const itemsInCart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [ cookies ] = useCookies();
  const {loading, error, data} = useQuery(GET_CART_ITEM, {
    variables: {
      uid: cookies.user
    },
    skip: !cookies.user,
    // pollInterval: 500,
    // fetchPolicy: 'cache-and-network'
  });

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      <main className="main-container h-auto px-3 w-full sm:container sm:px-0">
        <h1 className="mx-auto flex justify-center py-2 text-xl md:py-4 md:text-2xl lg:py-4 lg:text-2xl xl:py-5 xl:text-3xl">
          CART
        </h1>
        {/* title - when larger than sm */}
        <section className="hidden grid-cols-cartXL sm:grid">
          <div className={colTitleStyles}>Product</div>
          <div className={colTitleStyles}>Description</div>
          <div className={colTitleStyles}>Price</div>
          <div className={colTitleStyles}>Qty</div>
          <div className={colTitleStyles}>Sub</div>
          <div className={colTitleStyles}></div>
        </section>
        {/* title - when smaller than sm */}
        <section className="grid grid-cols-cart-title sm:hidden">
          <div className={colTitleStyles}>Product</div>
          <div className={colTitleStyles}>Description</div>
        </section>
        <ClientOnly>
          {
            cookies.user
            ? loading
              ? <Spinner />
              : !data?.currentCart
                ? <div className="flex w-full h-[200px] justify-center items-center text-3xl">Your cart is empty, let's go shopping!</div>
                : data?.currentCart?.map((item, index) => <CartItem uid={cookies.user} key={index} item={item} />)
            : <div className='flex w-full h-[200px] justify-center items-center text-3xl'>Login to shop!</div>
          }
        </ClientOnly>
        <div className="float-right mt-4 text-2xl">{`TOTAL: ${cartTotal}`}</div>
        <div className="clear-both"></div>
        {cartTotal !== 0 && (
          <Link
            href="/place-order"
            className="daisy-btn-primary float-right my-4 px-3 py-2 text-sm uppercase sm:px-5 sm:py-3 lg:text-lg"
          >
            Place order
          </Link>
        )}
        <div className="clear-both"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
