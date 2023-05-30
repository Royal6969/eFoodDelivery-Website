// let's add the import statement to import createAPI and fetchBaseQuery
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// with createApi and fetchBaseQuery, we can define endpoints to make requests to the API
const productAPI = createApi({
  reducerPath: "productAPI",  // a name to identify it
  // baseUrl: "https://localhost:7240/api/"
  baseQuery: fetchBaseQuery({ // to configure the baseQuery and here we want to fetch the baseQuery using a baseURL
    // we set here the same URL that we used in ProductList but without the endpoint
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/", // when we define the query endpoint, we will append the product there
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({  // when we build the endpoint, we have the arrow function where will get the builder object
    /////////////////////////////////////////// Endpoints starts here ///////////////////////////////////////////////

    // 1º endpoint to get all products from db
    // we want to define the endpoints for GetProducts (/api/Product) and GetProductById (/api/Product/{id})
    getProducts: builder.query({
      query: () => ({
        url: "Product" // the only parameter that we have is product
      }),
      providesTags: ["Products"] // when we retrieve this query, how we want to catch it, that is using the tag products that we defined in tagTypes before
      // so next time, if you update a product, you have to invalidate this tag and the endpoint will fetch the record again from the API
    }),

    // 2º endpoint to get a product by its id
    getProductById: builder.query({
      query: (productId) => ({ // when we have to get the product by id here, we will receive the parameter ID
        url: `Product/${productId}` // and we will use string interpolation here and add that to the URL here using the productID
      }),
      providesTags: ["Products"]
    }),

    // 3º endpoint to create a new product
    createProduct: builder.mutation({
      query: (data) => ({
        url: 'Product',
        method: 'POST',
        // headers: { "Content-type": "application/json" }, // optional in this case
        body: data
      }),
      invalidatesTags: ["Products"] // when we make a post request, we need to invalidate tags
    }),

    // 4º endpoint to update a product
    updateProductById: builder.mutation({
      query: ({ data, productId }) => ({
        url: 'Product/' + productId, // we have to append the productId in the route
        method: 'PUT',
        // headers: { "Content-type": "application/json" }, // optional in this case
        body: data
      }),
      invalidatesTags: ["Products"] // when we make an update request, we need to invalidate tags
    }),

    // 5º endpoint to delete a product
    DeleteProductById: builder.mutation({
      query: (productId) => ({
        url: 'Product/' + productId, // we have to append the productId in the route
        method: 'DELETE',
        // headers: { "Content-type": "application/json" }, // optional in this case
        // body: data // it doesn't need a body
      }),
      invalidatesTags: ["Products"] // when we make a delete request, we need to invalidate tags
    })
  })
});


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery, 
  useCreateProductMutation, 
  useUpdateProductByIdMutation, 
  useDeleteProductByIdMutation 
} = productAPI;
export default productAPI;