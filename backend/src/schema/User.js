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
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
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
