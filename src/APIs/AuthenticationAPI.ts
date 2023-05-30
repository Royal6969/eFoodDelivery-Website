import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// with createApi and fetchBaseQuery, we can define endpoints to make requests to the API
const authenticationAPI = createApi({
  reducerPath: "authenticationAPI",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://localhost:7240/api/"
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/"
  }),
  // tagTypes: [""], // we don't need any tagType in this case
  endpoints: (builder) => ({
    /////////////////////////////////////////// Endpoints starts here ///////////////////////////////////////////////
    
    // 1º endpoint to register a user
    registerUser: builder.mutation({
      query: (userData) => ({ // userData will have all the properties that we require for registration
        url: "Authentication/Register",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: userData
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    }),
    
    // 2º endpoint to login a user
    loginUser: builder.mutation({
      query: (userAccreditations) => ({ // userData will have all the properties that we require for registration
        url: "Authentication/Login",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: userAccreditations
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    }),
    
    // 3º endpoint to send an email with a code to recover the user password
    sendEmailToRecoverPassword: builder.mutation({
      query: (userEmail) => ({ // userData will have all the properties that we require for registration
        url: "Authentication/SendEmailToRecoverPassword",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userEmail)
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    }),
    
    // 4º endpoint to verify the code given in the email that the 3º endpoint before send
    verifyCode: builder.mutation({
      query: (userData) => ({ // userData will have all the properties that we require for registration
        url: "Authentication/VerifyCode",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: userData
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    }),
    
    // 5º endpoint to change the password for a new one
    changeUserPassword: builder.mutation({
      query: (userData) => ({ // userData will have all the properties that we require for registration
        url: "Authentication/ChangeUserPassword",
        method: "POST",
        // params: { } // we don't have parameters in this endpoint
        // we receive the data directly in a body in json format
        headers: { "Content-type": "application/json" },
        body: userData
      }),
      // invalidatesTags: [""] // we don't have to invalidate any tag here
    })
  })
});


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { useRegisterUserMutation, useLoginUserMutation, useSendEmailToRecoverPasswordMutation, useVerifyCodeMutation, useChangeUserPasswordMutation } = authenticationAPI;
export default authenticationAPI;