import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toastNotifyHelper } from '../../../helperMethods';
import { CartItemInterface, OrderRecapInterface } from '../../../interfaces';


const CheckoutForm = ({ apiDataResult, deliveryInput }: OrderRecapInterface) => { // receiving props from DeliveryDetails component
  const stripe = useStripe();
  const elements = useElements();
  const [isInProccess, setIsInProccess] = useState(false);

  // the helper method to get the credit card
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsInProccess(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
        // with this URL we have to redirect once the payment and everything is successful
      },
      redirect: 'if_required' // necessary to get a response with all payment data
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      toastNotifyHelper('Algo ha fallado durante el proceso de pago', 'error');
      setIsInProccess(false);
    } 
    else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(result);

      // create an array of orderDetailsCreateDTO
      const orderDetailsCreateDTO: any = [];

      // iterate inside prop apiDataResult received
      apiDataResult.cartItemsList?.forEach(
        (item: CartItemInterface) => {
          const createDetails: any = {}; // creating a temporary object

          createDetails['itemId'] = item.product?.id;
          createDetails['itemQuantity'] = item.quantity;
          createDetails['itemName'] = item.product?.name;
          createDetails['itemPrice'] = item.product?.price;

          orderDetailsCreateDTO.push(createDetails); // inserting the temporary object inside oredrDetailsCreateDTO array
        }
      )
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      
      <button className='btn btn-warning mt-4 w-100'>
        Submit
      </button>
    </form>
  );
};


export default CheckoutForm