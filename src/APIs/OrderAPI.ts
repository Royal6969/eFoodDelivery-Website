import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/",
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  tagTypes: ["Orders"], // we need invalidate tagTypes after for getOrder() when we're posting
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({ // when we post in API, we don't have any parameters, but we have to pass the complete object in the body
        url: "Order",
        method: 'POST',
        // params: {} // we don't need the params here
        headers: { "Content-type": "application/json" },
        body: orderDetails
      }),
      // providesTags: [""] // we dom't need any providesTags
      invalidatesTags: ["Orders"]
    }),
    // we want to define the endpoints for GetOrder(userId) (/api/Order/) and GetOrder(orderId) (/api/Order/{orderId})
    getOrdersFromUser: builder.query({
      query: ({ userId, orderSearch, orderStatus }) => ({ // now I have to pass the new parameters for filtered search in AllOrdersUsers
        url: "Order",
        params: {
          // userId: userId // and the new way to set params will be spreading them
          ...(userId && {userId}), // if userId is populated, only then we will pass userId, orderSearch or orderStatus
          ...(orderSearch && {orderSearch}),
          ...(orderStatus && {orderStatus})
        }
      }),
      providesTags: ["Orders"]
    }),
    getOrderDetailsById: builder.query({
      query: (orderId) => ({
        url: `Order/${orderId}`
      }),
      providesTags: ["Orders"]
    }),
    updateOrderById: builder.mutation({
      query: (newOrderDetails) => ({
        url: 'Order/' + newOrderDetails.orderId, // we have to append the orderId in the route
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: newOrderDetails
      }),
      invalidatesTags: ["Orders"] // when we make an update request, we need to invalidate tags
    })
  })
});


export const { 
  useCreateOrderMutation, 
  useGetOrdersFromUserQuery, 
  useGetOrderDetailsByIdQuery,
  useUpdateOrderByIdMutation
} = orderAPI;
export default orderAPI;