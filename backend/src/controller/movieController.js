import mongoose from "mongoose";
import { secretKey } from "../constant.js";
import { Admin, Movie } from "../schema/model.js";
import jwt from "jsonwebtoken";
import { decrypt } from "dotenv";
import registerRouter from "../router/registerRouter.js";
export const addMovie = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token && token.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let adminId;
  jwt.verify(token, secretKey, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    // throw new Error("Missing required fields");
    return res.status(422).json({ message: "Invalid Inputs " });
  }
  let movie;
  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
      // bookings,
    });

    const adminUser = await Admin.findById(adminId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }
    await movie.save();
    adminUser.addedMovies.push(movie);
    await adminUser.save();
  } catch (error) {
    return console.log(error);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed " });
  }
  return res.status(201).json({ movie });
};

// export const createMovie = async (req, res, next) => {
//   try {
//     let tokenString = req.headers.authorization;
//     let token = tokenString.split(" ")[1];

//     let infoObj = await jwt.verify(token, secretKey);
//     let userId = infoObj.id;
//     const { posterUrl, releaseDate, description, title, featured, actors } =
//       req.body;
//     if (
//       !posterUrl &&
//       posterUrl.trim() === "" &&
//       !description &&
//       description.trim() === "" &&
//       !title &&
//       description.trim() === ""
//     ) {
//       throw new Error("Missing required fields");
//     }
//     // const session = await mongoose.startSession();
//     // session.startTransaction();

//     let result = await Movie.create(
//       [
//         {
//           title,
//           description,
//           releaseDate: new Date(`${releaseDate}`),
//           featured,
//           actors,
//           admin: userId,
//           posterUrl,
//           // bookings,
//         },
//       ]
//       // { session: session }
//     );
//     // const adminUser = await await Admin.findById(userId);
//     // adminUser.addedMovies.push(result[0]._id);
//     // await adminUser.save({ session });

//     // await session.commitTransaction();
//     // session.endSession();

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
// export const createMovie = async (req, res, next) => {
//   try {
//     const {
//       posterUrl,
//       releaseDate,
//       description,
//       title,
//       featured,
//       actors,
//       bookings,
//       admin,
//     } = req.body;
//     if (
//       !posterUrl &&
//       posterUrl.trim() === "" &&
//       !description &&
//       description.trim() === "" &&
//       !title &&
//       description.trim() === ""
//     ) {
//       throw new Error("Missing required fields");
//     }
//     let result = await Movie.create([
//       {
//         title,
//         description,
//         releaseDate: new Date(`${releaseDate}`),
//         featured,
//         actors,
//         admin,
//         posterUrl,
//         bookings,
//       },
//     ]);
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
export const getMovieById = async (req, res, next) => {
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

// export const updateMovie = async (req, res, next) => {
//   try {
//     let tokenString = req.headers.authorization;
//     let token = tokenString.split(" ")[1];

//     let infoObj = await jwt.verify(token, secretKey);
//     let userId = infoObj.id;
//     const {
//       posterUrl,
//       releaseDate,
//       description,
//       title,
//       featured,
//       actors,
//       bookings,
//       admin,
//     } = req.body;
//     if (
//       !posterUrl &&
//       posterUrl.trim() === "" &&
//       !description &&
//       description.trim() === "" &&
//       !title &&
//       description.trim() === ""
//     ) {
//       throw new Error("Missing required fields");
//     }

//     let updateObj = {
//       title,
//       description,
//       releaseDate: new Date(`${releaseDate}`),
//       featured,
//       actors,
//       admin: userId,
//       posterUrl,
//       bookings,
//     };
//     let result = await Movie.findByIdAndUpdate(req.params._id, updateObj, {
//       new: true,
//     });
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
// export const deleteMovie = async (req, res, next) => {
//   try {
//     let result = await Movie.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//       success: true,
//       message: "delete movie ticket successfully.",
//       result: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
