import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// with createApi and fetchBaseQuery, we can define endpoints to make requests to the API
const userAPI = createApi({
  reducerPath: "userAPI",
  // baseUrl: "https://localhost:7240/api/"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/",
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    /////////////////////////////////////////// Endpoints starts here ///////////////////////////////////////////////

    // 1º endpoint to get all users from db
    getUsers: builder.query({
      query: () => ({
        url: "User"
      }),
      providesTags: ["Users"]
    }),

    // 2º endpoint to get an user by his id
    getUserById: builder.query({
      query: (userId) => ({
        url: `User/${userId}`
      }),
      providesTags: ["Users"]
    }),

    // 3º endpoint to delete a user by his id
    deleteUserById: builder.mutation({
      query: (userId) => ({
        url: 'User/' + userId,
        method: 'DELETE',
      }),
      invalidatesTags: ["Users"]
    })
  })
});


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { useGetUsersQuery, useGetUserByIdQuery, useDeleteUserByIdMutation } = userAPI;
export default userAPI;