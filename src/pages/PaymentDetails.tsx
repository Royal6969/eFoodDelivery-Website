import React from 'react'
import { useLocation } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../components/view/payments';


function PaymentDetails() {
  // we are looking for the apiDataResult and deliveryInput, and from where we want that, we want to extract that from useLocation() hook
  // that will make sure that whatever we're passing in the state when we navigate it's extracted and automatically populated
  const {
    state: {
      apiDataResult,
      deliveryInput
    }
  } = useLocation();

  // console.log(apiDataResult);
  // console.log(deliveryInput);

  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.
  const stripePromise = loadStripe('pk_test_51MspwoGRLxE2RSRugz0SSBg8T1DECm3fpmXbynumOSpFv2fzmhKaL3WBlcpRiuHsrXxdBXodlblgu01wQ6OgGm9z00W6tpZDPe');
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiDataResult.clientSecret,
  };


  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}


export default PaymentDetails