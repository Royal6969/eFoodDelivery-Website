import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsByIdQuery } from '../../APIs/OrderAPI';
import { OrderRecap } from '../../components/view/orders';
import { checkCustomerAuth } from '../../HOC';


function OrderDetails() {
  // we will retrieve the orderId that we're receiving as a parameter inside the route
  const { orderId } = useParams();
  // now we have to use our endpoint for the query useGetOrderDetailsById()
  const { data, isLoading } = useGetOrderDetailsByIdQuery(orderId);
  // like we have in PaymentDetails page, now we have to pupulate the "DeliveryInput" and the "OrderDetails" props
  let orderDetails, deliveryInput;
  // console.log(data);

  if (!isLoading && data?.result) {
    console.log(data.result); // with this we can see and check what we need to take and manage

    deliveryInput = {
      name: data.result[0].clientName,
      email: data.result[0].clientEmail,
      phone: data.result[0].clientPhone,
    }

    orderDetails = {
      id: data.result[0].orderId,
      cartItemsList: data.result[0].orderDetails,
      total: data.result[0].orderTotal,
      status: data.result[0].orderStatus
    }
  }


  return (
    <div style={{ maxWidth: '750px' }} className='container mx-auto p-3 w-100'>
      {!isLoading && orderDetails && deliveryInput && (
        <OrderRecap  // we have to pass these props to the OrderRecap component that it was already receiving
          apiDataResult={orderDetails} 
          deliveryInput={deliveryInput} 
        />
      )}
    </div>
  )
}


export default checkCustomerAuth(OrderDetails)