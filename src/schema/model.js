import { model } from "mongoose";
import registerSchema from "./registerSchema.js";

export let Register=model("Register",registerSchema)