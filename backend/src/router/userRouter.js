import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  loginUser,
  readSpecificUser,
  updateUser,
  verifyEmailUser,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.route("/").get(getAllUser);
userRouter.route("/signup").post(createUser);
userRouter.route("/verify-emails").patch(verifyEmailUser);
userRouter.route("/login").post(loginUser);

userRouter
  .route("/:id")
  .get(readSpecificUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
