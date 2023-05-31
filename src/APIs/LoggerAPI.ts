import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// with createApi and fetchBaseQuery, we can define endpoints to make requests to the API
const loggerAPI = createApi({
  reducerPath: "loggerAPI",
  // baseUrl: "https://localhost:7240/api/"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://efooddelivery-api.azurewebsites.net/api/",
    // to set the headers accordingly with tags [Authorize] in the API, we need to send a token back to the request, and that way our API will validate that
    prepareHeaders: (headers: Headers, api) => { // we need to get the token that we have and we have to pass that whenever we call the API endpoint
      const tokenStored = localStorage.getItem('token'); // we need to access and get our token
      tokenStored && headers.append('Authorization', 'Bearer ' + tokenStored) // Athorization is the header that we have to set when we're calling the APi
    }
  }),
  tagTypes: ["Logs"],
  endpoints: (builder) => ({
    /////////////////////////////////////////// Endpoints starts here ///////////////////////////////////////////////

    // 1º endpoint to get all logs from db
    getLogs: builder.query({
      query: ({ logSearch, logLevel, pageNumber, pageSize }) => ({ // now I have to pass the new parameters for filtered search in AllOrdersUsers
        url: "Logger",
        params: {
          ...(logSearch && {logSearch}),
          ...(logLevel && {logLevel}),
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
      providesTags: ["Logs"]
    }),

    // 2º endpoint to create a log
    createLog: builder.mutation({
      query: ({ log, level }) => ({
        url: 'Logger',
        method: 'POST',
        params: { 
          log: log, 
          level: level 
        }
      }),
      invalidatesTags: ["Logs"] // when we make a post request, we need to invalidate tags
    })
  })
});


// now, what we have here, our query, so the action methods are created automatically, but we have to add the name which is used
// then we set the endpoint name, changing the case, and we will have to append query at the end
// and these will be the default actions that are created automatically when we work with our query
export const { useGetLogsQuery, useCreateLogMutation } = loggerAPI;
export default loggerAPI;