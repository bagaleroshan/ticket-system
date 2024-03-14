import mongoose from "mongoose";
import { dbUrl } from "../../constant.js";

const connectToMongoDb = () => {
  mongoose.connect(dbUrl);
  console.log("application is connect to mongoDB successfully");
};
export default connectToMongoDb;
