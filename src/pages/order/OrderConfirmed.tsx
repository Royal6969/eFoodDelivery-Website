import React from 'react'
import { useParams } from 'react-router-dom';
import { checkCustomerAuth } from '../../HOC';


let orderConfirmedImage = require('../../assets/images/order-confirmed.jpg');

function OrderConfirmed() {
  // to get the orderId that we're receiving through the route we need to use the useParams() hook like we did in ProductDetails component
  const { orderId } = useParams();


  return (
    <div className='w-100 text-center d-flex justify-content-center align-items-center'>
      <div>
        <i style={{ fontSize: '7rem' }} className='bi bi-check2-circle text-success'></i>

        <div className='pb-5'>
          <h2 className=' text-success'>¡Tu pedido ha sido confirmado!</h2>
          <h5 className='mt-3'>Identificador del pedido: {orderId}</h5>
          <p>En breves momentos, comenzaremos a preparar todo lo que nos has encargado.</p>
          
          <img src={orderConfirmedImage} style={{ width: '40%', borderRadius: '30px' }} alt=''></img>
        </div>
      </div>
    </div>
  )
}


export default checkCustomerAuth(OrderConfirmed)