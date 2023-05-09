import React from 'react'
import { useLocation } from 'react-router-dom'


function PaymentDetails() {
  // we are looking for the apiDataResult and deliveryInput, and from where we want that, we want to extract that from useLocation() hook
  // that will make sure that whatever we're passing in the state when we navigate it's extracted and automatically populated
  const {
    state: {
      apiDataResult,
      deliveryInput
    }
  } = useLocation();

  console.log(apiDataResult);
  console.log(deliveryInput);

  return (
    <div>Payment Details</div>
  )
}


export default PaymentDetails