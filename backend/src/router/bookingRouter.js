import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controller/bookingController.js";
const bookingRouter = express.Router();
bookingRouter.route("/").post(newBooking);
bookingRouter
  .route("/:id")
  .get(getBookingById)
  //   .patch(updateMovie)
  .delete(deleteBooking);

export default bookingRouter;
