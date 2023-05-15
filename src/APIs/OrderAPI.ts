import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/"
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
      query: (userId) => ({
        url: "Order",
        params: {
          userId: userId
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