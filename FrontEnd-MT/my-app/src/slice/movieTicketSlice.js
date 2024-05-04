import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = {
  movieName: "English",
  person: 1,
  price: 500,
};
export const movieTicketSlice = createSlice({
  name: "movieTicket",
  initialState: initialStateValue,
  reducers: {
    changeMovieName: (state, action) => {
      state.movieName = action.payload;
    },
    changePerson: (state, action) => {
      state.person = action.payload;
    },
    changePrice: (state, action) => {
      state.price = action.payload;
    },
  },
});
export const { changeMovieName, changePerson, changePrice } =
  movieTicketSlice.actions;
export default movieTicketSlice.reducer;
