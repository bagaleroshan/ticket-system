import { Schema } from "mongoose";

const bookingSchema = Schema(
  {
    movie: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);
export default bookingSchema;
