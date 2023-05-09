import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const paymentAPI = createApi({
  reducerPath: "paymentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/"
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