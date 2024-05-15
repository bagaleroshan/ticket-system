import { Booking } from "../schema/model.js";

export const createBooking = async (req, res, next) => {
  try {
    const { movie, date, seatNumber, user } = req.body;
    let result = await Booking.create({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    res.status(200).json({
      success: true,
      massage: "User verify  successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
