import mongoose, { Schema } from "mongoose";

const movieSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actors: [{ type: String, required: true }],
    releaseDate: {
      type: Date,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    feature: {
      type: Boolean,
    },
    bookings: [{ type: String }],
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeStamp: true }
);
export default movieSchema;
