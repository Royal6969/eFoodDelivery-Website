import React from 'react'
import { CartItemInterface } from '../../../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/redux/ReduxStorage'
import { removeItemFromCart, updateItemQuantity } from '../../../store/redux/CartSlice';
import { useUpdateCartMutation } from '../../../APIs/CartAPI';


function CartRecap() {
  // now we need to add the useDispatch() hook to call the actions in CartSlice
  const dispatch = useDispatch();
  // but to make all this functionality not in local (redux storage) and connecting with the API and database, we have to use the cart endpoints that we've made before
  const [updateCart] = useUpdateCartMutation(); // we have to invoke this before the dispatch hooks calls

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

  // to use the dispatch hook for the updateQuantity and removeItem actions, we need helper methods
  const handleItemsQuantity = (updateQuantity: number, cartItem: CartItemInterface) => {
    // we have to check if there is only one item in the cart and they select two decrements, so that means we will have to remove this item
    // or if the updateQuantity is equal to 0, taht will means that the right button here is selected to remove the product
    if ((updateQuantity == -1 && cartItem.quantity == 1) || updateQuantity == 0) { // and both of these cases we have to remove the item
      updateCart({
        productId: cartItem.product?.id,
        updateQuantity: 0,
        userId: '26c2a46a-5fa6-43c1-8765-f96cc07d85bb'
      });

      dispatch(removeItemFromCart({
        cartItem,
        quantity: 0
      }));
    }
    // and else, we just need to update the quantity with the new quantity
    else {
      updateCart({
        productId: cartItem.product?.id,
        updateQuantity: updateQuantity, // when we're working with the API, we only have to pass the new quantity
        userId: '26c2a46a-5fa6-43c1-8765-f96cc07d85bb'
      });
      
      dispatch(updateItemQuantity({
        cartItem,
        quantity: cartItem.quantity! + updateQuantity
      }));
    }
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
                    <i 
                      className='bi bi-dash-circle-fill'
                      onClick={() => handleItemsQuantity(-1, cartItem)}
                      // -1 because this button is for decrement, and the cartItem is from cartFromReduxStorage that we're mapping
                    ></i>
                  </span>
                  
                  <span>
                    <b>
                      {cartItem.quantity}
                    </b>
                  </span>
                  
                  <span style={{ color: 'rgba(22, 22, 22, 0.7)' }} role='button'>
                    <i 
                      className='bi bi-plus-circle-fill'
                      onClick={() => handleItemsQuantity(+1, cartItem)}
                      // +1 because this button is for decrement, and the cartItem is from cartFromReduxStorage that we're mapping
                    ></i>
                  </span>
                </div>

                <button 
                  className='btn btn-danger mx-1'
                  onClick={() => handleItemsQuantity(0, cartItem)}
                  // when we want to remove anything we will pass 0
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )
      )}

    </div>
  )
}


export default CartRecap