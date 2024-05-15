import { model } from "mongoose";
import registerSchema from "./registerSchema.js";
import movieTicketSchema from "./movieTicketSchema.js";
import userSchema from "./User.js";
import adminSchema from "./Admin.js";
import movieSchema from "./Movie.js";
import bookingSchema from "./Bookings.js";

export let Register = model("Register", registerSchema);
export let MovieTicket = model("MovieTicket", movieTicketSchema);
export let User = model("User", userSchema);
export let Admin = model("Admin", adminSchema);
export let Movie = model("Movie", movieSchema);
export let Booking = model("Booking", bookingSchema);
