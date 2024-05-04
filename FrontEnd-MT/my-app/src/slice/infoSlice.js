import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = {
  name: "roshan",
  age: 22,
  isMarried: false,
};
export const counterSlice = createSlice({
  name: "infoSlice",
  initialState: initialStateValue,
  reducers: {
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    // changeAge: (state, action) => {
    //   state.age = action.payload;
    // },
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
