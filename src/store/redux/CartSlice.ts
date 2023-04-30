import { createSlice } from "@reduxjs/toolkit";


// and inside here we have to think about what will be the slice that we want to manage?
// we want to manage an array of cartItems
// so for the initial state, we will set that as cartItems, which is an array
const initialState = {
  cartItems: []
};


// now we have to export the const cartSlice and we say it's equal to the createSlice() method
// and here we will configure our reducer or slice
export const cartSlice = createSlice({
  name: "CartItems",
  initialState: initialState,
  reducers: { // here we want the reducers that will be responsible for managing the state
    setCart: (state, action) => {  // it receives two parameters, first one is the state itself, and the second one is the action
      state.cartItems = action.payload; // we need to set the state for cart which will be passed to us from the payload when we invoke this
    }
  }
});


// finally we will export the setCart action, and we will also export the cartReducer from cartSlice
export const { setCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;