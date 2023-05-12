import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toastNotifyHelper } from '../../../helperMethods';
import { ApiResponse, CartItemInterface, OrderRecapInterface } from '../../../interfaces';
import { useCreateOrderMutation } from '../../../APIs/OrderAPI';
import { StaticDetails_OrderStatus } from '../../../Utils/StaticDetails';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ apiDataResult, deliveryInput }: OrderRecapInterface) => { // receiving props from DeliveryDetails component
  const stripe = useStripe();
  const elements = useElements();
  const [isInProccess, setIsInProccess] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  // we need a console.log() to see and check what we have to receive and capture from inside apiDataResult 
  // to create an order object (const createOrderResponse)
  // console.log(apiDataResult);

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
      // console.log(result.error.message);
      toastNotifyHelper('Algo ha fallado durante el proceso de pago', 'error');
      setIsInProccess(false);
    } 
    else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      // console.log(result);

      // create an array of orderDetailsCreateDTO
      const orderDetailsCreateDTO: any = [];
      let orderTotal = 0;
      let totalItems = 0;

      // iterate inside prop apiDataResult received
      apiDataResult.cartItemsList?.forEach(
        (item: CartItemInterface) => {
          const createDetails: any = {}; // creating a temporary object

          createDetails['itemId'] = item.product?.id;
          createDetails['itemQuantity'] = item.quantity;
          createDetails['itemName'] = item.product?.name;
          createDetails['itemPrice'] = item.product?.price;

          orderDetailsCreateDTO.push(createDetails); // inserting the temporary object inside oredrDetailsCreateDTO array

          orderTotal += (item.quantity! * item.product?.price!);
          totalItems += item.quantity!;
        }
      );

      // let's call the order API endpoint, where we have to create the order passing the complete object 
      const createOrderResponse: ApiResponse = await createOrder({
        clientName: deliveryInput.name,
        clientPhone: deliveryInput.phone,
        clientEmail: deliveryInput.email,
        clientId: apiDataResult.userId,
        orderTotal: orderTotal,
        orderPaymentId: apiDataResult.paymentAttempId,
        orderStatus: result.paymentIntent.status === "succeeded" 
          ? StaticDetails_OrderStatus.STATUS_CONFIRMED
          : StaticDetails_OrderStatus.STATUS_PENDING,
          // typescript alredy knows that because these types are alredy defined inside the Stripe package that we added  
        orderQuantityItems : totalItems,
        orderDetailsCreateDTO: orderDetailsCreateDTO,
      });
      console.log(createOrderResponse); // to check if the new order object has been created successfully

      // if createOrderResponse is present and the status for order is "Confirmed", we want to redirect user to OrderConfirmed component
      if (createOrderResponse) {
        if (createOrderResponse.data?.result.orderStatus === StaticDetails_OrderStatus.STATUS_CONFIRMED) {
          navigate(`/order/OrderConfirmed/${createOrderResponse.data.result.orderId}`);
        }
        else {
          navigate('/failed');
        }
      }
    }
    setIsInProccess(false);
  };


  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      
      <button 
        className='btn btn-warning mt-4 w-100' 
        disabled={!stripe || isInProccess} // we can find this in the Stripe documentation
      >
        <span id='button-text'>
          {isInProccess
            ? 'Procesando pago...'
            : 'Pagar pedido'
          }
        </span>
      </button>
    </form>
  );
};


export default CheckoutForm