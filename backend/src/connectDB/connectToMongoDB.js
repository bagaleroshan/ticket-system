import mongoose from "mongoose"
import { dbUrl } from "../constant.js"

const connectToMongoDB=()=>{
    mongoose.connect(dbUrl)
    console.log("application is connected to mongodb successfully.")
}
export default connectToMongoDB