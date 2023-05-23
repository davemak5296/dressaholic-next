import Link from 'next/link';
import clsx from 'clsx';
import Footer from '@/components/Footer';
import CartItem from '@/components/Cart-item';
import { GetServerSideProps } from 'next';
import NavBar from '@/components/Nav-bar';
import useNavbarHeight from '@/src/hooks/useNavbarHeight';
import { useCookies } from 'react-cookie';
import { useQuery } from '@apollo/client';
import { graphql } from '@/src/gql';
import ClientOnly from '@/components/ClientOnly';
import Spinner from '@/components/Spinner';

export const GET_CART_AND_TOTAL = graphql(`
  query GetCurrentCartAndTotal($uid: String!) {
    currentCartAndTotal(uid: $uid) {
      cart {
        sku
        brand
        displayName
        imageUrl
        price
        color
        size
        qty
      }
      total
    }
  }
`)
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

  const [ cookies ] = useCookies();
  const {loading, error, data} = useQuery(GET_CART_AND_TOTAL, {
    variables: {
      uid: cookies.user
    },
    skip: !cookies.user,
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
          <>
            {/* items */}
            { cookies.user
              ? loading
                ? <Spinner />
                : data && data?.currentCartAndTotal?.cart?.length > 0
                  ? data.currentCartAndTotal.cart.map(({__typename, ...otherfields}, index) => <CartItem uid={cookies.user} key={index} item={otherfields} />)
                  : <div className="flex w-full h-[200px] justify-center items-center text-3xl">Your cart is empty, let's go shopping!</div> 
              : <div className='flex w-full h-[200px] justify-center items-center text-3xl'>Login to shop!</div>
            }

            {/* Total */}
            { cookies.user
              ? loading || data?.currentCartAndTotal?.total == 0
                ? null 
                : <div className='float-right mt-4 text-2xl'>{`Total: ${data?.currentCartAndTotal?.total}`}</div>
              : null
            }

            {/* Place order button */}
            <div className="clear-both"></div>
            { !data?.currentCartAndTotal?.total ? null : (
              <Link
                href="/place-order"
                className="daisy-btn-primary float-right my-4 px-3 py-2 text-sm uppercase sm:px-5 sm:py-3 lg:text-lg"
                tabIndex={0}
              >
                Place order
              </Link>
            )}
            <div className="clear-both"></div>
          </>
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
