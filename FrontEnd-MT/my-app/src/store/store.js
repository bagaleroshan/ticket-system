import { configureStore } from "@reduxjs/toolkit";
import { movieTicketApi } from "../services/api/movieTicketServices";
import movieTicketSlice from "../slice/movieTicketSlice";

export const store = configureStore({
  reducer: {
    movieTicket: movieTicketSlice,
    [movieTicketApi.reducerPath]: movieTicketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieTicketApi.middleware]),
});
