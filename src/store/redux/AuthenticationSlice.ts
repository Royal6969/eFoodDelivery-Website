import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces";


const initialState: UserInterface = { // here's what we'll want to store from user... all things that user needs to register
  fullName: "",
  userId: "",
  email: "",
  role: ""
};


export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
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


export const { setUserLogged } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;