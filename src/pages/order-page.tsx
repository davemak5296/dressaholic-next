import * as React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectCartItems, selectCartTotal } from '../store/cart/cart.selector';
import CartItem from '../components/cart-item.component';
import OrderFormInput from '../components/order-form-input.component';
import Footer from '../components/footer';
import useFooterFixed from '../hooks/useFooterFixed';
import { useImmer } from 'use-immer';
import _ from 'lodash';

const colTitleStyles = clsx('bg-secondary text-secondary-content text-xs sm:text-sm xl:text-base');

export type InputValType = {
  name: string;
  contact: string;
  email: string;
  address: string;
  pay: string;
  remark: string;
};
const OrderPage: React.FC = () => {
  const itemsInCart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { isFooterFixed, mainRef } = useFooterFixed();
  const [inputVal, setInputVal] = useImmer<InputValType>({
    name: '',
    contact: '',
    email: '',
    address: '',
    pay: '',
    remark: '',
  });

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <>
      <main ref={mainRef} className="main-container px-3 sm:container sm:px-0">
        <h1 className="mx-auto flex justify-center py-2 text-xl font-light md:py-4 md:text-2xl lg:py-4 lg:text-2xl xl:py-5 xl:text-3xl">
          Order Info
        </h1>
        <section className="flex w-full flex-col justify-start lg:flex-row">
          <div className="w-full shrink-0 lg:w-2/5">
            <div className="grid grid-cols-cartXL-order">
              <div className={`${colTitleStyles} pl-1`}>Product</div>
              <div className={`${colTitleStyles} pl-1`}>Description</div>
              <div className={colTitleStyles}>Price</div>
              <div className={colTitleStyles}>Qty</div>
              <div className={colTitleStyles}>Sub</div>
            </div>
            <div className="max-h-[50vh] overflow-y-scroll">
              {itemsInCart.map((item, index) => (
                <CartItem key={index} item={item} orderPage={true} />
              ))}
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
                setValue={setInputVal}
                isTextType={true}
                required={true}
              />
              <OrderFormInput
                width="half"
                id="contact"
                name="contact no."
                value={inputVal.contact}
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
              setValue={setInputVal}
              isTextType={true}
              required={true}
            />
            <OrderFormInput
              width="full"
              id="address"
              name="address"
              value={inputVal.address}
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
            <OrderFormInput
              width="full"
              id="pay"
              name="payment methods"
              value={inputVal.pay}
              setValue={setInputVal}
              isTextType={false}
            >
              <select
                id="ship-pay"
                className="border border-solid border-base-300 bg-white p-1 text-sm"
                placeholder="Please enter recipient's address:"
                onChange={(e) =>
                  setInputVal((draft) => {
                    draft.pay = e.target.value;
                  })
                }
                required
              >
                <option value="" disabled selected>
                  Please select a payment method:
                </option>
                <option value="bank-transfer">Bank transfer</option>
                <option value="credit-card">Credit card</option>
              </select>
              {inputVal.pay.length == 0 && (
                <label className="text-xs font-light text-red-500">
                  please select a payment method
                </label>
              )}
            </OrderFormInput>
            <button
              type="button"
              className="daisy-btn-primary float-right mt-4 px-3 py-2 uppercase sm:px-5 sm:py-3"
              onClick={clickHandler}
            >
              Confirm
            </button>
          </form>
        </section>
      </main>
      <Footer isFixed={isFooterFixed} />
    </>
  );
};

export default OrderPage;
