import express, { json } from "express";
import cors from "cors";
import connectToMongoDB from "./src/connectDB/connectToMongoDB.js";
import { port } from "./src/constant.js";
import registerRouter from "./src/router/registerRouter.js";
import movieTicketRouter from "./src/router/movieTicketRouter.js";
import userRouter from "./src/router/userRouter.js";
import adminRouter from "./src/router/adminRouter.js";
import movieRouter from "./src/router/movieRouter.js";
import bookingRouter from "./src/router/bookingRouter.js";
let expressApp = express();
// expressApp.use(cors())
expressApp.use(cors());
expressApp.use(json());
connectToMongoDB();

expressApp.use("/registers", registerRouter);
expressApp.use("/movie-tickets", movieTicketRouter);
expressApp.use("/users", userRouter);
expressApp.use("/admins", adminRouter);
expressApp.use("/movies", movieRouter);
expressApp.use("/bookings", bookingRouter);

expressApp.listen(port, () => {
  console.log(`app is listening at port ${port}.`);
});

//OtXBXyaMrHJfmjg5
