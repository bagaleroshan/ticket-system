import { model } from "mongoose";
import registerSchema from "./registerSchema.js";
import movieTicketSchema from "./movieTicketSchema.js";

export let Register = model("Register", registerSchema);
export let MovieTicket = model("MovieTicket", movieTicketSchema);
