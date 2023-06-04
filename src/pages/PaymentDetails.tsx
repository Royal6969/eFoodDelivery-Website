import React from 'react'
import { useLocation } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../components/view/payments';
import { OrderRecap } from '../components/view/orders';
import { checkCustomerAuth } from '../HOC';


function PaymentDetails() {
  // we are looking for the apiDataResult and deliveryInput, and from where we want that, we want to extract that from useLocation() hook
  // that will make sure that whatever we're passing in the state when we navigate it's extracted and automatically populated
  const {
    state: {
      apiDataResult,
      deliveryInput
    }
  } = useLocation();

  // we need to create an interface to receive and save this two results
  // it's not a global interface, but we can create also inside interfaces folder
  // to create that interface, we have to check in console the content inside these states
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
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-7'>
            {/* <h3 className='text-warning'>Resumen del pedido</h3> */}
            <OrderRecap  // we have to pass these props to the OrderRecap component
              apiDataResult={apiDataResult} 
              deliveryInput={deliveryInput} 
            />
          </div>

          <div className='col-md-4 offset-md-1'>
            <h3 className='text-warning'>Formulario de Pago</h3>
            <div className='mt-2'>
              <CheckoutForm 
                apiDataResult={apiDataResult} 
                deliveryInput={deliveryInput} 
              />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  )
}


export default checkCustomerAuth(PaymentDetails)