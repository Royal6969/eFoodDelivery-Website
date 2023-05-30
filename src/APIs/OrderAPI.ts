import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// with createApi and fetchBaseQuery, we can define endpoints to make requests to the API
const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://localhost:7240/api/"
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/",
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  tagTypes: ["Orders"], // we need invalidate tagTypes after for getOrder() when we're posting
  endpoints: (builder) => ({
    /////////////////////////////////////////// Endpoints starts here ///////////////////////////////////////////////

    // 1º endpoint to create an order
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

    // 2º endpoint to get all user orders
    // we want to define the endpoints for GetOrder(userId) (/api/Order/) and GetOrder(orderId) (/api/Order/{orderId})
    getOrdersFromUser: builder.query({
      query: ({ userId, orderSearch, orderStatus, pageNumber, pageSize }) => ({ // now I have to pass the new parameters for filtered search in AllOrdersUsers
        url: "Order",
        params: {
          // userId: userId // and the new way to set params will be spreading them
          ...(userId && {userId}), // if userId is populated, only then we will pass userId, orderSearch or orderStatus
          ...(orderSearch && {orderSearch}),
          ...(orderStatus && {orderStatus}),
          // now as we can see in this API endpoint, also we need to pass the page details for the pageNumber and the pageSize
          ...(pageNumber && {pageNumber}),
          ...(pageSize && {pageSize})
        }
      }),
      // the response headers are not automatically being retrieved, so to do that, 
      // here we need to transform the response that is being received by the query and then return back
      // we need to use "transformResponse" and receive two parameters, 
      // the apiResponse and its metaData (metaData will have all the header information)
      transformResponse(apiDataResponse: { result: any }, metaData: any) {
        return {
          apiDataResponse,
          recordsNumber: metaData.response.headers.get('X-Pagination')
        }
      },
      providesTags: ["Orders"]
    }),

    // 3º endpoint to get the orders details
    getOrderDetailsById: builder.query({
      query: (orderId) => ({
        url: `Order/${orderId}`
      }),
      providesTags: ["Orders"]
    }),

    // 4º endpoint to update an order
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


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { 
  useCreateOrderMutation, 
  useGetOrdersFromUserQuery, 
  useGetOrderDetailsByIdQuery,
  useUpdateOrderByIdMutation
} = orderAPI;
export default orderAPI;