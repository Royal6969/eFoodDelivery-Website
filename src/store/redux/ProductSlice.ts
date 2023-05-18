// First thing that we want to work in the slice here and we will be creating a slice, and we have to import it from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";


// and inside here we have to think about what will be the slice that we want to manage?
// we want to manage an array or list of products
// so for the initial state, we will set that as product, which is an array
const initialState = {
  product: [],
  bannerSearch: ''
};


// now we have to export the const productSlice and we say it's equal to the createSlice() method
// and here we will configure our reducer or slice
export const productSlice = createSlice({
  name: "Product",
  initialState: initialState,
  reducers: { // here we want the reducers that will be responsible for managing the state
    setProduct: (state, action) => {  // it receives two parameters, first one is the state itself, and the second one is the action
      state.product = action.payload; // we need to set the state for product which will be passed to us from the payload when we invoke this
    },
    setProductSearch: (state, action) => {
      state.bannerSearch = action.payload;
    }
  }
});


// finally we will export the setProduct action, and we will also export the productReducer from productSlice
export const { setProduct, setProductSearch } = productSlice.actions;
export const productReducer = productSlice.reducer;