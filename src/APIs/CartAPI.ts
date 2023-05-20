// let's add the import statement to import createAPI and fetchBaseQuery
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cartAPI = createApi({
  reducerPath: "cartAPI",  // a name to identify it
  baseQuery: fetchBaseQuery({ // to configure the baseQuery and here we want to fetch the baseQuery using a baseURL
    // we set here the same URL that we used in ProductList but without the endpoint
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/", // when we define the query endpoint, we will append the user there
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  tagTypes: ["Carts"],
  endpoints: (builder) => ({  // when we build the endpoint, we have the arrow function where will get the builder object
    getCart: builder.query({
      query: (userId) => ({ // when we have to get the cart by userId here, we will receive the parameter ID
        // url: `cart/${userId}` // and we will use string interpolation here and add that to the URL here using the userID
        // but rather than doing this like before with products, what we can do is we want to go to the cart endpoint and then we want to pass the parameters
        url: `cart`,
        params: { // because if you examine the endpoint in API, this endpoint is receiving the userId as a parameter to be executed
          userId: userId
        }
      }),
      providesTags: ["Carts"]
    }),
    // we alredy added a userId in our code right now, and that is what we will be using for all the request that we make
    // that looks good for the query, but main thing when we add or remove anything from the cart is calling this post endpoint
    // for that we will have to call a mutation where we have the get cart here, we would rather calling update cart here
    // and for that we will go to builder a mutation and first thing here will be the query itself
    updateCart: builder.mutation({ // this endpoint have three parameters (userId, productId, updateQuantity),
      // so we will get all those values when we invoke this mutation as a parameter
      query: ({ productId, updateQuantity, userId }) => ({
        url: "cart",
        method: "POST",
        params: { productId, updateQuantity, userId }
      }),
      // we will have to invalidate that tag, and that way teh query will fetch a new cart
      invalidatesTags: ["Carts"]
    })
  })
});


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { useGetCartQuery, useUpdateCartMutation } = cartAPI;
export default cartAPI;