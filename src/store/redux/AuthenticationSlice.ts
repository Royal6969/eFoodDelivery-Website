import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces";


// and inside here we have to think about what will be the slice that we want to manage?
export const initialUserEmptyState: UserInterface = { // here's what we'll want to store from user... all things that user needs to register
  fullName: "",
  userId: "",
  email: "",
  role: ""
}; // note that it's the token content


// and here we will configure our reducer or slice
export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState: initialUserEmptyState,
  reducers: {
    /////////////////////////////////////////// Actions starts here ///////////////////////////////////////////////
    
    // 1º action to set a user as logged in
    setUserLogged: (state, action) => {
      // when a user is logged in, we will have all the details in payload that we will pass here when calling the setUserLogged
      // so from that payload, we have to extract everything and assign them right here
      state.fullName = action.payload.fullName;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.role = action.payload.role;
    }
  }
});


// finally we will export the actions, and we will also export the reducers from slice
export const { setUserLogged } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;