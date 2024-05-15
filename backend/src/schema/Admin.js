import mongoose, { Schema } from "mongoose";

const adminSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
   
    addedMovies: [
      {
        type: mongoose.Types.ObjectId,
        ref:"Movie"
      },
    ],
  },
  { timeStamp: true }
);
export default adminSchema;
