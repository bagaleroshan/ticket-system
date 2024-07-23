import express from "express";
import {
  adminLogin,
  createAdmin,
  getAdminById,
  getAdmins
} from "../controller/adminController.js";
const adminRouter = express.Router();
adminRouter;

adminRouter.route("/").get(getAdmins);
adminRouter.route("/signup").post(createAdmin);
// adminRouter.route("/verify-emails").patch(verifyEmailAdmin);
adminRouter.route("/login").post(adminLogin);
adminRouter.route("/:id").get(getAdminById);

export default adminRouter;
