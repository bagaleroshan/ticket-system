import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
        ref: "Movie",
        required: true,
      },
    ],
    isVerifyEmail: {
      type: String,
      required: [true, "isVerifyEmail must be required."],
    },
  },
  { timeStamp: true }
);
export default userSchema;
