import express from "express";
import { createBooking } from "../controller/bookingController.js";
const bookingRouter = express.Router();
bookingRouter.route("/").post(createBooking )
// movieRouter
//   .route("/:id")
//   .get(readSpecificMovie)
//   .patch(updateMovie)
//   .delete(deleteMovie);

export default bookingRouter;
