import React from 'react'
import { PaymentElement } from '@stripe/react-stripe-js';


const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      
      <button className='btn btn-warning mt-4 w-100'>
        Submit
      </button>
    </form>
  );
};


export default CheckoutForm