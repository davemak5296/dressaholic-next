import * as React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntentResult, StripeCardElement } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../store/cart/cart.selector';
import { selectCurrentUser } from '../store/user/user.selector';
import Spinner from './spinner.component';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const paymentHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (amount === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    const { paymentIntent }: PaymentIntentResult = await fetch(
      '/.netlify/functions/create-payment-intent',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      }
    ).then((res) => res.json());

    const clientSecret = paymentIntent?.client_secret as string;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: currUser ? (currUser.displayName as string) : 'Guest',
        },
      },
    });

    setIsProcessing(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment succeed!');
      }
    }
  };

  return (
    <div className="ml-[20%] flex h-[200px] w-[50%] justify-end">
      <form className="h-[100px] min-w-[300px] max-w-[500px]" onSubmit={paymentHandler}>
        <h2 className="mb-4">Credit Card Payment:</h2>
        {isMounted && <CardElement />}
        <button
          className="daisy-btn daisy-btn-outline relative mt-4 w-[100px]"
          disabled={isProcessing}
          type="submit"
        >
          {isProcessing ? <Spinner sm={true} /> : 'Pay now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
// export default React.memo(PaymentForm);
