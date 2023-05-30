// now this store is where we will manage all the slices. To configure the store we need to import the configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductSlice";
import { authenticationAPI, cartAPI, orderAPI, paymentAPI, productAPI, userAPI } from "../../APIs"; // we have to register it as a reducer
import { cartReducer } from "./CartSlice";
import { authenticationReducer } from "./AuthenticationSlice";


const reduxStorage = configureStore({ // we have to configure the objects here
  reducer: {
    // first we need to add our slice files
    productStore: productReducer,  // name for the store and the reducer imported
    cartStore: cartReducer, // adding the cartReducer with its cartSlice
    authenticationStore: authenticationReducer, // adding the authenticationReducer with its AuthenticationSlice

    // second we need to add our api files
    [productAPI.reducerPath]: productAPI.reducer,
    [cartAPI.reducerPath]: cartAPI.reducer,
    [authenticationAPI.reducerPath]: authenticationAPI.reducer,
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  
  // now you should remember that when we have to register the API, we also have to add that in the middleware, and it needs a default configuration
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(productAPI.middleware)
      .concat(cartAPI.middleware)
      .concat(authenticationAPI.middleware)
      .concat(paymentAPI.middleware)
      .concat(orderAPI.middleware)
      .concat(userAPI.middleware)
});


// now when we are working with Typescript, we basically have to export the root state and that will be the type os store state
// that way, whatever is the type of the current state of the slice that will be exported in the root state
export type RootState = ReturnType<typeof reduxStorage.getState>;
// getting the state by this way, whenever we are calling the paryicular store, Typescript will expect a type,
// and we can use that as root state that we have exported right here

export default reduxStorage;