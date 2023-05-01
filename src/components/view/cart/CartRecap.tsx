import React from 'react'
import { CartItemInterface } from '../../../interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/redux/ReduxStorage'


function CartRecap() {
  // to access to our redux store, we have a hook called useSelector() that is inside the React Redux library
  // and here, basically we will be extracting that from the store
  const cartFromReduxStorage: CartItemInterface[] = useSelector(
    // then we have to define the state
    (state: RootState) => state.cartStore.cartItemsList ?? [] // and if it's null, return an empty array
  );

  // if cartFromReduxStorage is empty...
  if (!cartFromReduxStorage) {
    return (
      <div>El carrito está vacío</div>
    );
  }

  // ...else show the UI
  // and we will have to loop through all the cartItems inside the cartFromReduxStorage
  return (
    <div className='container p-4 m-2'>
      <h4 className='text-center text-success'>Cart Summary</h4>
      
      {cartFromReduxStorage.map(
        (cartItem: CartItemInterface, index: number) => (
          <div 
            style={{ background: 'ghostwhite' }} 
            className='d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3'
            key={index}
          >
            <div className='p-3'>
              <img 
                src={cartItem.product?.image} 
                className='rounded-circle' 
                width={'120px'} 
                alt='' 
              />
            </div>

            <div style={{ width: '100%' }} className='p-2 mx-3'>
              <div className='d-flex justify-content-between align-items-center'>
                <h4 style={{ fontWeight: 300 }}>
                  {cartItem.product?.name}
                </h4>
                
                <h4>
                  {(cartItem.quantity! * cartItem.product!.price).toFixed(2)}€ 
                  {/* the ! symbol means not null assertion with Typescript */}
                  {/* it checks that quantity is not null and then it will access its value */}
                </h4>
              </div>
              
              <div className='flex-fill'>
                <h4 className='text-danger'>
                  {cartItem.product!.price}
                </h4>
              </div>
              
              <div className='d-flex justify-content-between'>
                <div style={{ width: '100px', height: '43px' }} className='d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow'>
                  <span style={{ color: 'rgba(22, 22, 22, 0.7)' }} role='button'>
                    <i className='bi bi-dash-circle-fill'></i>
                  </span>
                  
                  <span>
                    <b>
                      {cartItem.quantity}
                    </b>
                  </span>
                  
                  <span style={{ color: 'rgba(22, 22, 22, 0.7)' }} role='button'>
                    <i className='bi bi-plus-circle-fill'></i>
                  </span>
                </div>

                <button className='btn btn-danger mx-1'>Remove</button>
              </div>
            </div>
          </div>
        )
      )}

    </div>
  )
}


export default CartRecap