import mongoose from "mongoose";
import { dbUrl } from "../constant.js";
import adminSeeder from "../adminSeeder.js";

const connectToMongoDB = () => {
  mongoose.connect(dbUrl);
  console.log("application is connected to mongodb successfully.");
  adminSeeder();
};
export default connectToMongoDB;
