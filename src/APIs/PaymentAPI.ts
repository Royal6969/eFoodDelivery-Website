import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const paymentAPI = createApi({
  reducerPath: "paymentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/",
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  // tagTypes: [""], // we don't need any tagTypes
  endpoints: (builder) => ({
    stripePayment: builder.mutation({
      query: (userId) => ({ // as we can see and remember, in our API endpoint we receive the userId as a parameter
        url: "Payment", // the name for the endpoint in our API
        method: 'POST',
        params: {
          userId: userId // so params we will pass the userId which we receive in the parameters
        }
      }),
      // providesTags: [""] // we dom't need any providesTags
    })
  })
});


export const { useStripePaymentMutation } = paymentAPI;
export default paymentAPI;