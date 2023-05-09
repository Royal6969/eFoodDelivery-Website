import React, { useState } from 'react'
import { ApiResponse, CartItemInterface, UserInterface } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/redux/ReduxStorage';
import { InputHelper } from '../../../helperMethods';
import { MiniLoader } from '../common';
import { useStripePaymentMutation } from '../../../APIs/PaymentAPI';
import { useNavigate } from 'react-router-dom';


function DeliveryDetails() {
  // to show the delivery details of the cart, we have to retrieve the cart from the redux storage like we did in the CartRecap component
  // to access to our redux store, we have a hook called useSelector() that is inside the React Redux library
  // and here, basically we will be extracting that from the store
  const cartFromReduxStorage: CartItemInterface[] = useSelector(
    // then we have to define the state
    (state: RootState) => state.cartStore.cartItemsList ?? [] // and if it's null, return an empty array
  );

  // here we can use the useSelector() hook again to get the user from the redux store
  const userDataFromAuthenticationStore: UserInterface = useSelector((state: RootState) => state.authenticationStore);

  // we need two variables for the total items of one product, and the cart total for the all products amount
  let cartTotal = 0;
  let totalItems = 0;

  // to calculate the totalItems we need to iterate each item through the cart
  cartFromReduxStorage?.map((cartItem: CartItemInterface) => {
    totalItems += cartItem.quantity ?? 0;
    cartTotal  += (cartItem.product?.price ?? 0) * (cartItem.quantity ?? 0); // product price * items quantity
    // the operator ?? means "if it's null..."
    // and finally we don't have to return anything
    return null;
  });

  // for values in the input fields for receive the delivery data
  const initialDeliveryData = {
    name: userDataFromAuthenticationStore.fullName,
    email: userDataFromAuthenticationStore.email,
    phone: ""
  };
  // when we have controlled components, we will have an onChange() event and we will pass the corresponding value to the corresponding field
  // but if you have multiple of them, it will get ugly if you have three states for each one of them
  // so rather than that, let's create a helper method folder where we have the components at the same directory

  // so what we have in the initialDeliveryData, we can create a state for that
  const [deliveryInput, setDeliveryInput] = useState(initialDeliveryData);

  // basically if we use the InputHelper on those input fields, if the field has a name of email, 
  // it will automatically assign that value to an email field inside the initialDeliveryData
  const handleDeliveryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, deliveryInput);
    // once we do that, we can call the setState with the new data that we receive, which is tempData
    setDeliveryInput(tempData);
  }
  // and after that, all we have to do is call this method inside each input element

  // this state is to add a loader when user click the final button to place the order
  const [loading, setLoading] = useState(false);

  // here we're going to call the payment mutation
  const [stripePayment] = useStripePaymentMutation();
  // to redirect user to PaymentDetails page with the order data
  const navigate = useNavigate();

  // submit event to place the order
  const handleSubmitPlaceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // now we have to invoke the stripePayment mutation to retrieve the data
    const { data }: ApiResponse = await stripePayment(userDataFromAuthenticationStore.userId);
    // console.log(data);
    
    // and when we navigate to the PaymentDetails page, we can also pass a local state here
    navigate('/PaymentDetails', {
      state: { // here we're passing to the different components some values, but we're using a state which will be on navigate itself
        apiDataResult: data?.result,
        deliveryInput
      }
    });
  }


  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Detalles del reparto
      </h1>
      <hr />
      
      {/* so name field is required if you use this approach and it must match */}
      {/* now I find easier when I'm working with many multiple inputs on a form */}
      {/* That way I don't have to bind their state individually */}
      {/* and the best part is if I move that to a helper component, I can reuse the same logic in multiple places */}
      <form className="col-10 mx-auto" onSubmit={handleSubmitPlaceOrder}>
        <div className="form-group mt-3">
          Nombre
          <input 
            type="text" 
            className="form-control" 
            placeholder="nombre..." 
            name="name" 
            required
            value={deliveryInput.name}
            onChange={handleDeliveryInput}
          />
        </div>
        
        <div className="form-group mt-3">
          Email
          <input 
            type="email" 
            className="form-control" 
            placeholder="email..." 
            name="email" 
            required 
            value={deliveryInput.email}
            onChange={handleDeliveryInput}
          />
        </div>

        <div className="form-group mt-3">
          Teléfono
          <input 
            type="number" 
            className="form-control" 
            placeholder="teléfono..." 
            name="phone" 
            required 
            value={deliveryInput.phone}
            onChange={handleDeliveryInput}
          />
        </div>
        
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>
              Total carrito: {cartTotal.toFixed(2)}€
            </h5>
            <h5>
              Número de productos: {totalItems}
            </h5>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading} // if it's loading, the button will be disabled
        >
          {/* if loading it's true, we will display a mini-loader */}
          {loading
            ? <MiniLoader />
            : "mmmm...¿pinta bien? ¡pues encargar pedido!"
          }
        </button>
      </form>
    </div>
  )
}


export default DeliveryDetails