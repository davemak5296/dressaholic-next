import {useState, MouseEventHandler, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import validator from 'validator';
import clsx from 'clsx';
import { selectCartItems, selectCartTotal } from '@/store/cart/cart.selector';
import CartItem from '@/components/Cart-item';
import OrderFormInput from '@/components/Order-form-input';
import Footer from '@/components/Footer';
import PaymentForm from '@/components/Payment-form';
import { CardElement } from '@stripe/react-stripe-js';
import { GetServerSideProps } from 'next';
import NavBar from '@/components/Nav-bar';
import useNavbarHeight from '@/src/hooks/useNavbarHeight';
import { gql, useQuery } from '@apollo/client';
import { GET_CART_ITEM } from '@/components/Cart-dropdown';
import client, { CartItemFieldNames } from '@/src/utils/apollo.utils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/utils/firebase/firebase.utils';
import Spinner from '@/components/Spinner';
import ClientOnly from '@/components/ClientOnly';
type OrderPageProps = {
  isAuth: boolean;
  uid: string | null;
}

export const getServerSideProps: GetServerSideProps<OrderPageProps>= async ({req}) => {
  const isAuth = req.cookies.user ? true : false; 

  if (isAuth) {
    const cartDocRef = doc(db, 'cart', req.cookies.user as string);
    const cartSnapShot = await getDoc(cartDocRef);
    
    return !!cartSnapShot.data()?.cart?.length
      ? { props: { 
            isAuth: isAuth,
            uid: req.cookies.user ?? null
        }}
      // if no item in cart, redirect to home page
      : { redirect: {
            destination: '/',
            permanent: false
        }}
  }
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

const colTitleStyles = clsx('bg-secondary text-secondary-content text-xs sm:text-sm xl:text-base');

export type InputValType = {
  name: string;
  nameValid: 'initial' | boolean;
  contact: string;
  contactValid: 'initial' | boolean;
  email: string;
  emailValid: 'initial' | boolean;
  address: string;
  addressValid: 'initial' | boolean;
  remark: string;
};
const OrderPage = ( { isAuth, uid }: OrderPageProps) => {
  const { scrollH } = useNavbarHeight();
  const itemsInCart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [inputVal, setInputVal] = useImmer<InputValType>({
    name: '',
    nameValid: 'initial',
    contact: '',
    contactValid: 'initial',
    email: '',
    emailValid: 'initial',
    address: '',
    addressValid: 'initial',
    remark: '',
  });

  const {loading, error, data} = useQuery(GET_CART_ITEM, {
    variables: {
      uid: uid
    },
    skip: !uid
    // pollInterval: 500,
    // fetchPolicy: 'cache-and-network'
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    setInputVal((draft) => {
      draft['nameValid'] = draft['name'].length !== 0;
      draft['addressValid'] = draft['address'].length !== 0;
      draft['emailValid'] = validator.isEmail(draft['email']);
      draft['contactValid'] = validator.isMobilePhone(draft['contact'], ['zh-HK']);
    });
    if (
      inputVal.nameValid === true &&
      inputVal.contactValid === true &&
      inputVal.emailValid === true &&
      inputVal.addressValid === true
    ) {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      <main className="main-container px-3 sm:container sm:px-0">
        <h1 className="mx-auto flex justify-center py-2 text-xl font-light md:py-4 md:text-2xl lg:py-4 lg:text-2xl xl:py-5 xl:text-3xl">
          Order Info
        </h1>
        <section className="flex w-full flex-col flex-wrap justify-start lg:flex-row">
          <div className="w-full shrink-0 lg:w-2/5">
            <div className="grid grid-cols-cartXL-order">
              <div className={`${colTitleStyles} pl-1`}>Product</div>
              <div className={`${colTitleStyles} pl-1`}>Description</div>
              <div className={colTitleStyles}>Price</div>
              <div className={colTitleStyles}>Qty</div>
              <div className={colTitleStyles}>Sub</div>
            </div>
            <div className="max-h-[50vh] overflow-y-scroll">
            <ClientOnly>
              { loading
                  ? <Spinner />
                  : data?.currentCart?.map((item, index) => (
                      <CartItem key={index} uid={uid as string} item={item} orderPage={true} />
                    ))
              }
            </ClientOnly>
              {/* {itemsInCart.map((item, index) => (
                <CartItem key={index} item={item} orderPage={true} />
              ))} */}
            </div>
            <div className="mx-4 mt-1 flex justify-between text-2xl">
              <div className="font-normal">TOTAL</div>
              <div className="mr-8 font-normal lg:mr-2">${cartTotal}</div>
            </div>
          </div>
          <form className="mx-2 mt-4 w-full p-2 lg:mx-0 lg:mt-0 lg:ml-4 lg:w-1/2">
            <h2 className="flex justify-start text-xl font-light lg:justify-center">
              Shipping info
            </h2>
            <section className="flex justify-between">
              <OrderFormInput
                width="half"
                id="name"
                name="name"
                value={inputVal.name}
                valid={inputVal.nameValid}
                setValue={setInputVal}
                isTextType={true}
                required={true}
              />
              <OrderFormInput
                width="half"
                id="contact"
                name="contact no."
                value={inputVal.contact}
                valid={inputVal.contactValid}
                setValue={setInputVal}
                isTextType={true}
                required={true}
              />
            </section>
            <OrderFormInput
              width="full"
              id="email"
              name="email"
              value={inputVal.email}
              valid={inputVal.emailValid}
              setValue={setInputVal}
              isTextType={true}
              required={true}
            />
            <OrderFormInput
              width="full"
              id="address"
              name="address"
              value={inputVal.address}
              valid={inputVal.addressValid}
              setValue={setInputVal}
              isTextType={true}
              required={true}
            />
            <OrderFormInput
              width="full"
              id="remark"
              name="order remark"
              value={inputVal.remark}
              setValue={setInputVal}
              isTextType={false}
            >
              <textarea
                id="ship-remark"
                className="border border-solid border-base-300 p-1 text-sm font-light"
                placeholder="Please enter remarks"
              />
            </OrderFormInput>
            <div className="mt-3 flex w-full">
              <label htmlFor="ship-pay" className="pb-[1px] capitalize">
                Payment Methods:&nbsp;&nbsp;
              </label>
              <input id="ship-pay" type="radio" required={true} defaultChecked={true} />
              &nbsp;credit card
            </div>
            <button
              type="button"
              className="daisy-btn-primary float-right mt-4 px-3 py-2 uppercase sm:px-5 sm:py-3"
              onClick={clickHandler}
            >
              Confirm
            </button>
          </form>
          {showPaymentForm && <PaymentForm setValue={setInputVal} />}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
