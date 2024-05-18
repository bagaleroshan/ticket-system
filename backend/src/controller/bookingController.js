import mongoose from "mongoose";
import { Booking, Movie, User } from "../schema/model.js";

// export const newBooking = async (req, res, next) => {
//   try {
//     const { movie, date, seatNumber, user } = req.body;
//     let existingMovie;
//     let existingUser;
//     try {
//       existingMovie = await Movie.findById(movie);
//       existingUser = await User.findById(user);
//     } catch (error) {
//       return console.log(error);
//     }
//     if (!existingMovie) {
//       return res
//         .status(404)
//         .json({ message: "Movie not found with given Id." });
//     }
//     if (!existingUser) {
//       return res.status(404).json({ message: "user not found with given Id." });
//     }

//     let result;
//     try {
//       result = await Booking.create({
//         movie,
//         date: new Date(date),
//         seatNumber,
//         user,
//       });

//       existingUser.booking.push(result._id);
//       existingMovie.booking.push(result._id);

//       await existingUser.save();
//       await existingMovie.save();
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Error creating booking", error: error.message });
//     }
//     res.status(200).json({
//       success: true,
//       massage: "User verify  successfully",
//       result: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  // let existingMovie;
  let existingUser;
  // if (!mongoose.Types.ObjectId.isValid(movie)) {
  //   return res.status(400).json({ message: "Invalid movie ID" });
  // }
  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    // existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  // if (!existingMovie) {
  //   return res.status(404).json({ message: "Movie not found with given Id." });
  // }
  if (!existingUser) {
    return res.status(404).json({ message: "user not found with given Id." });
  }

  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });
    await booking.save();
    existingUser.bookings.push(booking._id);
    // existingMovie.bookings.push(booking._id);
    await existingUser.save();
    // await existingMovie.save();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "unable to create a booking" });
  }
  return res.status(201).json({ booking: booking });
};

export const getBookingById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "user read successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteBooking = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await Booking.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "user delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
