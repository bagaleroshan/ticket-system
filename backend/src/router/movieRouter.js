import express from "express";
import {
  addMovie,
  getMovieById,
  readAllMovie
} from "../controller/movieController.js";
const movieRouter = express.Router();
movieRouter.route("/").post(addMovie).get(readAllMovie);
movieRouter.route("/:id").get(getMovieById);
// .patch(updateMovie)
// .delete(deleteMovie);

export default movieRouter;
