import { Router } from "express";
import { createRegisterController } from "../controller/registerController.js";

export let registerRouter =Router()
registerRouter
.route("/").post(createRegisterController)
