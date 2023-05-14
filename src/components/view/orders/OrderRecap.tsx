import React from 'react'
import { CartItemInterface, OrderRecapInterface } from '../../../interfaces'
import { getOrderStatusColor } from '../../../helperMethods'
import { useNavigate } from 'react-router-dom';


function OrderRecap({ apiDataResult, deliveryInput }: OrderRecapInterface) { // receiving props from DeliveryDetails component
  // console.log(apiDataResult);
  // calling our getOrderStatusColor helper method to change dynamically the status for the order status tag at top of screen
  const orderStatusTagTypeColor = getOrderStatusColor(apiDataResult.status!);

  // define useNavigate() hook for back button
  const navigate = useNavigate();


  return (
    <div>
      {' '}
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className={`text-${orderStatusTagTypeColor}`}>Resumen del pedido</h3>
        <span style={{ cursor: 'none' }} className={`btn btn-outline-${orderStatusTagTypeColor} fs-6`}>
          {apiDataResult.status}
        </span>
      </div>

      <div className='mt-3'>
        <div className='border py-3 px-2'>Nombre: {deliveryInput.name}</div>
        <div className='border py-3 px-2'>Email: {deliveryInput.email}</div>
        <div className='border py-3 px-2'>Teléfono: {deliveryInput.phone}</div>
        
        <div className='border py-3 px-2'>
          <h4 className='text-warning'>Productos</h4>
          
          <div className='p-3'>
            {apiDataResult.cartItemsList?.map(
              (cartItem: CartItemInterface, index: number) => {
                return (
                  <div className='d-flex' key={index}>
                    <div className='d-flex w-100 justify-content-between'>
                      <p>{cartItem.product?.name}</p>
                      <p>{cartItem.quantity} x {cartItem.product?.price}€ =</p>
                    </div>
                    
                    <p style={{ width: '70px', textAlign: 'right' }}>
                      {(cartItem.quantity ?? 0) * (cartItem.product?.price ?? 0)}€
                    </p>
                  </div>
                )
              }
            )}
            <hr />
            
            <h4 style={{ textAlign: 'right' }} className='text-danger'>
              {apiDataResult.total?.toFixed(2)}€
            </h4>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center mt-3'>
        <button
          className='btn btn-secondary'
          onClick={() => navigate(-1)}
        >
          Volver a los pedidos
        </button>
      </div>
    </div>
  )
}


export default OrderRecap