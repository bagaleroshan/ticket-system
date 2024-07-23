import mongoose, { Mongoose, Schema } from "mongoose";

const bookingSchema = Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
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
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeStamp: true }
);
export default bookingSchema;
