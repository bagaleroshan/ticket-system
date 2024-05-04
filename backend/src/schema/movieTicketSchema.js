import { Schema } from "mongoose";

const movieTicketSchema = Schema(
  {
    movieName: {
      type: String,
    },
    person: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timeStamp: true }
);
export default movieTicketSchema;
