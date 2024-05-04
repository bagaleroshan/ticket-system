import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "../../config/config";

export const movieTicketApi = createApi({
  reducerPath: "movieTicketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: [],
  // tagTypes: ["readMovieTicket"],
  endpoints: (builder) => ({
    readMovieTicket: builder.query({
      query: () => {
        return {
          url: "/movie-tickets",
          method: "GET",
        };
      },
      // providesTags: ["readMovieTicket"],
    }),
    readMovieTicketById: builder.query({
      query: (id) => {
        return {
          url: `/movie-tickets/${id}`,
          method: "GET",
        };
      },
    }),
    deleteMovieTicket: builder.mutation({
      query: (id) => {
        return {
          url: `/movie-tickets/${id}`,
          method: "DELETE",
        };
      },
    }),

    createMovieTicket: builder.mutation({
      query: (body) => {
        return {
          url: "/movie-tickets",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});
export const {
  useReadMovieTicketQuery,
  useDeleteMovieTicketMutation,
  useReadMovieTicketByIdQuery,
  useCreateMovieTicketMutation,
} = movieTicketApi;
