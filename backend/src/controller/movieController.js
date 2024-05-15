import mongoose from "mongoose";
import { secretKey } from "../constant.js";
import { Admin, Movie } from "../schema/model.js";
import jwt from "jsonwebtoken";
export const createMovie = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let token = tokenString.split(" ")[1];

    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj.id;
    const {
      posterUrl,
      releaseDate,
      description,
      title,
      featured,
      actors,
      bookings,
      admin,
    } = req.body;
    if (
      !posterUrl &&
      posterUrl.trim() === "" &&
      !description &&
      description.trim() === "" &&
      !title &&
      description.trim() === ""
    ) {
      throw new Error("Missing required fields");
    }
    // const session = await mongoose.startSession();
    // session.startTransaction();

    let result = await Movie.create(
      [
        {
          title,
          description,
          releaseDate: new Date(`${releaseDate}`),
          featured,
          actors,
          admin: userId,
          posterUrl,
          bookings,
        },
      ]
      // { session: session }
    );
    // const adminUser = await await Admin.findById(userId);
    // adminUser.addedMovies.push(result[0]._id);
    // await adminUser.save({ session });

    // await session.commitTransaction();
    // session.endSession();

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
export const readAllMovie = async (req, res, next) => {
  try {
    let result = await Movie.find({});
    res.status(200).json({
      success: true,
      message: "Read movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readSpecificMovie = async (req, res, next) => {
  try {
    let result = await Movie.findById(req.params.id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "read movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// export const updateMovie = async (req, res, next) => {
//   try {
//     let result = await Movie.findByIdAndUpdate(req.params.id, req.body);
//     res.status(201).json({
//       success: true,
//       message: "update movie ticket successfully.",
//       result: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateMovie = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let token = tokenString.split(" ")[1];

    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj.id;
    const {
      posterUrl,
      releaseDate,
      description,
      title,
      featured,
      actors,
      bookings,
      admin,
    } = req.body;
    if (
      !posterUrl &&
      posterUrl.trim() === "" &&
      !description &&
      description.trim() === "" &&
      !title &&
      description.trim() === ""
    ) {
      throw new Error("Missing required fields");
    }

    let updateObj = {
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: userId,
      posterUrl,
      bookings,
    };
    let result = await Movie.findByIdAndUpdate(req.params._id, updateObj, {
      new: true,
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
export const deleteMovie = async (req, res, next) => {
  try {
    let result = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "delete movie ticket successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
