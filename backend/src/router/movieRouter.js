import express from "express";
import { createMovie, deleteMovie, readAllMovie, readSpecificMovie, updateMovie } from "../controller/movieController.js";
const movieRouter = express.Router();
movieRouter.route("/").post(createMovie).get(readAllMovie);
movieRouter
  .route("/:id")
  .get(readSpecificMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

export default movieRouter;
