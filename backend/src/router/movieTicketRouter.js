import { Router } from "express";
import {
  createMovieTicketController,
  deleteMovieTicketController,
  readAllMovieTicketController,
  readSpecificMovieTicketController,
  updateMovieTicketController,
} from "../controller/movieTicketController.js";

const movieTicketRouter = Router();
movieTicketRouter
  .route("/")
  .post(createMovieTicketController)
  .get(readAllMovieTicketController);

movieTicketRouter
  .route("/:id")
  .get(readSpecificMovieTicketController)
  .patch(updateMovieTicketController)
  .delete(deleteMovieTicketController);

export default movieTicketRouter;
