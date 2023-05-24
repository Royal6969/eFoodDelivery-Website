import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const userAPI = createApi({
  reducerPath: "userAPI",
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
    getUsers: builder.query({
      query: () => ({
        url: "User"
      }),
      providesTags: ["Users"]
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `User/${userId}`
      }),
      providesTags: ["Users"]
    }),
    deleteUserById: builder.mutation({
      query: (userId) => ({
        url: 'User/' + userId,
        method: 'DELETE',
      }),
      invalidatesTags: ["Users"]
    })
  })
});


export const { useGetUsersQuery, useGetUserByIdQuery, useDeleteUserByIdMutation } = userAPI;
export default userAPI;