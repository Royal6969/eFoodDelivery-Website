import React, { useState } from 'react'
import { CartItemInterface, OrderRecapInterface, UserInterface } from '../../../interfaces'
import { getOrderStatusColor } from '../../../helperMethods'
import { useNavigate } from 'react-router-dom';
import { StaticDetails_OrderStatus, StaticDetails_Roles } from '../../../Utils/StaticDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/ReduxStorage';
import { useUpdateOrderByIdMutation } from '../../../APIs/OrderAPI';
import { BigLoader } from '../common';
import { useCreateLogMutation } from '../../../APIs/LoggerAPI';


function OrderRecap({ apiDataResult, deliveryInput }: OrderRecapInterface) { // receiving props from DeliveryDetails component
  // console.log(apiDataResult);
  
  // calling our getOrderStatusColor helper method to change dynamically the status for the order status tag at top of screen
  const orderStatusTagTypeColor = getOrderStatusColor(apiDataResult.status!);
  // define useNavigate() hook for back button
  const navigate = useNavigate();
  // here we can use the useSelector() hook to get the user from the redux store
  const userDataFromAuthenticationStore: UserInterface = useSelector((state: RootState) => state.authenticationStore);
  // useState() hook to check if functions are in process or not
  const [isLoading, setIsLoading] = useState(false);
  // define a constant to call the update mutation for the order details
  const [updateOrder] = useUpdateOrderByIdMutation();
  // define mutation to create new logs
  const [createLog] = useCreateLogMutation();

  // define constant to save the current order status and to allow change it
  const nextOrderStatus: any = apiDataResult.status! === StaticDetails_OrderStatus.STATUS_CONFIRMED
      // if the status is x, then create an object
      ? { color: 'info', value: StaticDetails_OrderStatus.STATUS_COOKING }
    : apiDataResult.status! === StaticDetails_OrderStatus.STATUS_COOKING
      ? { color: 'warning', value: StaticDetails_OrderStatus.STATUS_READY }
    : apiDataResult.status! === StaticDetails_OrderStatus.STATUS_READY
      && { color: 'success', value: StaticDetails_OrderStatus.STATUS_COMPLETED }

  // helper method to update cancel status order 
  const handleUpdateCancelOrderStatus = async () => {
    setIsLoading(true);
    
    await updateOrder({
      orderId: apiDataResult.id,
      orderStatus: StaticDetails_OrderStatus.STATUS_CANCELLED
    });

    createLog({ log: "Pedido con id \"" + apiDataResult.id + "\" cancelado", level: "info" });

    setIsLoading(false);
  }

  // helper method to update next status order
  const handleUpdateNextOrderStatus = async () => {
    setIsLoading(true);

    await updateOrder({
      orderId: apiDataResult.id,
      orderStatus: nextOrderStatus.value
    });

    setIsLoading(false);
  }


  return (
    <div>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <>
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
            <button className='btn btn-secondary' onClick={() => navigate(-1)}>
              Volver a los pedidos
            </button>

            {userDataFromAuthenticationStore.role == StaticDetails_Roles.ADMIN && (
              <div className='d-flex'>
                {(apiDataResult.status! !== StaticDetails_OrderStatus.STATUS_CANCELLED) && (apiDataResult.status! !== StaticDetails_OrderStatus.STATUS_COMPLETED) && (
                  <button 
                    className='btn btn-danger mx-2'
                    onClick={handleUpdateCancelOrderStatus}
                  >
                    Cancelar Pedido
                  </button>
                )}
                
                <button
                  className={`btn btn-${nextOrderStatus.color}`}
                  onClick={handleUpdateNextOrderStatus}
                >
                  {nextOrderStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
    </div>
  )
}


export default OrderRecap