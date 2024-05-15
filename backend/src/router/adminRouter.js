import express from "express";
import { adminLogin, createAdmin } from "../controller/adminController.js";
const adminRouter = express.Router();
adminRouter
  //   .route("/")
  .post("/signup", createAdmin)
  .post("/login", adminLogin);

export default adminRouter;
