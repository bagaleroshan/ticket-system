import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getBookingOfUser,
  loginUser,
  readSpecificUser,
  updateUser,
  verifyEmailUser
} from "../controller/userController.js";

const userRouter = Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/signup").post(createUser);
userRouter.route("/verify-emails").patch(verifyEmailUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/bookings/:id").get(getBookingOfUser);

userRouter
  .route("/:id")
  .get(readSpecificUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
