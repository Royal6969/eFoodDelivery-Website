// now this store is where we will manage all the slices. To configure the store we need to import the configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductSlice";


const reduxStorage = configureStore({ // we have to configure the objects here
  reducer: {
    productStore: productReducer  // name for the store and the reducer imported
  }
});


// now when we are working with Typescript, we basically have to export the root state and that will be the type os store state
// that way, whatever is the type of the current state of the slice that will be exported in the root state
export type RootState = ReturnType<typeof reduxStorage.getState>;
// getting the state by this way, whenever we are calling the paryicular store, Typescript will expect a type,
// and we can use that as root state that we have exported right here

export default reduxStorage;