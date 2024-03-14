import { Schema } from "mongoose";

let registerSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "userName must be required."],
    },
    email: {
      type: String,
      required: [true, "email must be required."],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "phoneNumber must be required."],
    },
    dob: {
      type: Date,
      required: [true, "dob must be field up"],
    },
    address: {
      type: String,
      required: [true, "address must be required"],
    },
    gender: {
      type: String,
      required: [true, "gender must be required."],
    },
    role: {
      type: String,
      required: [true, "role must be required."],
    },
    password: {
      type: String,
      required: [true, "password must be required."],
    },
    isVerifiedEmail: {
      type: Boolean,
      required: [true, "isVerifiedEmail is must be required."],
    },
  },
  { timestamp: true }
);
export default registerSchema