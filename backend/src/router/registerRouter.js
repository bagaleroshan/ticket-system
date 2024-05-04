import { Router } from "express";
import {
  createRegisterController,
  deleteRegisterController,
  forgetPassword,
  loginController,
  myProfileController,
  profileUpdateController,
  readAllController,
  readSpecificController,
  resetPassword,
  updatePasswordController,
  updateRegisterController,
  verifyEmail,
} from "../controller/registerController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";
import validation from "../middleware/validation.js";
import registerValidation from "../validation/registerValidation.js";

let registerRouter = Router();
registerRouter
  .route("/")
  //  .post(validation(registerValidation),createRegisterController)
  .post(createRegisterController)
  .get( readAllController);
registerRouter.route("/verify-emails").patch(verifyEmail);

registerRouter.route("/login-users").post(loginController);

registerRouter.route("/my-profiles").get(isAuthenticated, myProfileController);
registerRouter
  .route("/profile-updates")
  .patch(isAuthenticated, profileUpdateController);
registerRouter
  .route("/update-passwords")
  .patch(isAuthenticated, updatePasswordController);
registerRouter.route("/forget-passwords").post(forgetPassword);
registerRouter.route("/reset-passwords").patch(isAuthenticated, resetPassword);
registerRouter
  .route("/:id")
  .get(isAuthenticated,authorized(["admin","superAdmin"]) ,readSpecificController)
  .patch(isAuthenticated,authorized(["admin","superAdmin"]), updateRegisterController)
  .delete(isAuthenticated,authorized(["superAdmin"]), deleteRegisterController);
export default registerRouter;
