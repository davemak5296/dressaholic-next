import { useState, FormEventHandler } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntentResult, StripeCardElement } from '@stripe/stripe-js';
import Spinner from './Spinner';
import { Updater } from 'use-immer';
import { InputValType } from 'pages/place-order';
import { useRouter } from 'next/router';

type PaymentFormProp = {
  amount: number;
  displayName: string;
  setValue: Updater<InputValType>;
};

const PaymentForm = ({ amount, displayName, setValue }: PaymentFormProp) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (amount === 0) {
      alert('Your cart is empty!');
      return;
    }
    setIsProcessing(true);

    const { paymentIntent }: PaymentIntentResult = await fetch(
      '/api/payment',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      }
    ).then((res) => res.json());

    const clientSecret = paymentIntent?.client_secret as string;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: displayName
        },
      },
    });
    setIsProcessing(false);

    if (paymentResult.error) {
      alert(paymentResult.error?.message);
    } else {
      if (paymentResult.paymentIntent?.status === 'succeeded') {
        alert('Payment succeed!');
        router.push('/');
      }
    }
  };
  
  return (
    <div className="ml-[20%] flex h-[200px] w-[50%] justify-end">
      <form className="h-[100px] min-w-[300px] max-w-[500px]" onSubmit={paymentHandler}>
        <h2 className="mb-4">Credit Card Payment:</h2>
        <CardElement />
        <button
          className="daisy-btn daisy-btn-outline relative mt-4 w-[100px]"
          disabled={isProcessing}
          onClick={(e) =>
            setValue((draft) => {
              draft.address = '';
              draft.contact = '';
              draft.email = '';
              draft.name = '';
              draft.remark = '';
            })
          }
          type="submit"
        >
          {isProcessing ? <Spinner sm={true} /> : 'Pay now'}
        </button>
        <p className="mt-2 text-sm text-red-500">
          *Please use below test card for payments*
          <br />
          4242-4242-4242-4242
          <br />
          Exp: 04-24 - CVC: 242 - Zip code: 24242
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;