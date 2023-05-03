import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const authenticationAPI = createApi({
  reducerPath: "authenticationAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/"
  }),
  // tagTypes: [""], // we don't need any tagType in this case
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({ // userData will have all teh properties that we require for registration
        url: "Authentication/Register",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: userData
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    }),
    loginUser: builder.mutation({
      query: (userAccreditations) => ({ // userData will have all teh properties that we require for registration
        url: "Authentication/Login",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: userAccreditations
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    })
  })
});


export const { useRegisterUserMutation, useLoginUserMutation } = authenticationAPI;
export default authenticationAPI;