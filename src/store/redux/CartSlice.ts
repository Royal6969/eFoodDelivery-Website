import { createSlice } from "@reduxjs/toolkit";
import { CartInterface } from "../../interfaces";


// and inside here we have to think about what will be the slice that we want to manage?
// we want to manage an array of cartItems
// so for the initial state, we will set that as cartItems, which is an array
const initialState: CartInterface = {
  cartItemsList: []
};


// now we have to export the const cartSlice and we say it's equal to the createSlice() method
// and here we will configure our reducer or slice
export const cartSlice = createSlice({
  name: "CartItems",
  initialState: initialState,
  reducers: { // here we want the reducers that will be responsible for managing the state
    /////////////////////////////////////////// Actions starts here ///////////////////////////////////////////////

    // 1º action to set the cart for the user in App and avoid lose the cart when we reload the page
    setCart: (state, action) => {  // it receives two parameters, first one is the state itself, and the second one is the action
      state.cartItemsList = action.payload; // we need to set the state for cart which will be passed to us from the payload when we invoke this
    },

    // 2º action to update the items quantity
    updateItemQuantity: (state, action) => {
      // inside the state, we will have all the cartItems
      state.cartItemsList = state.cartItemsList?.map((item) => {
        // if the id matches with the id that is being passed in the payload
        // in payload here we will be getting the cartItem that needs to be updated
        if (item.id === action.payload.cartItem.id) {
          // you should remember that we have to pass the CartItem with the id as well as the quantity in the payload
          item.quantity = action.payload.quantity;
        }
        // but if it's not true, we want to return back that item, because if we don't do that, then it will only have one item with that cartItem
        return item;
        // that is how map function works. If the condition means you want to do this as you don't want to touch any other cartItems
      });
    },

    // 3º action to remove the cart items
    removeItemFromCart: (state, action) => {
      // when we have to remove an item from the cart, rather than map, we will be using filter method here
      state.cartItemsList = state.cartItemsList?.filter((item) => {
        // if the id matches we want to return null
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        // else we want to return the item
        return item;
        // so if the id matches it will remove that from the cart, else it will return back each item
        // so that way it will only remove the cartItem that it finds based on this id match
      });
    }
  }
});


// finally we will export the setCart action, and we will also export the cartReducer from cartSlice
export const { setCart, updateItemQuantity, removeItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;