import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../schema/model.js";
import { secretKey } from "../constant.js";
export const createAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (error) {
    return console.log(error);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  let admin;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    admin = new Admin({ email, password: hashPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingAdmin) {
    return res.status(400).json({
      message: "Admin not found",
    });
  }
  const isValidPassword = bcrypt.compareSync(password, existingAdmin.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = jwt.sign({ id: existingAdmin._id }, secretKey, {
    expiresIn: "5d",
  });
  return res
    .status(200)
    .json({ message: "Authentication Complete", token, id: existingAdmin._id });
};

export const getAdmins = async (req, res, next) => {
  try {
    let result = await Admin.find();
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

// import { Admin } from "../schema/model.js";
// import bcrypt from "bcrypt";
// import { clientUrl, secretKey } from "../constant.js";
// import jwt from "jsonwebtoken";
// import { sendEmail } from "../utils/sendMail.js";
// export const createAdmin = async (req, res, next) => {
//   try {
//     let data = req.body;
//     let hashPassword = await bcrypt.hash(data.password, 10);
//     data = {
//       ...data,
//       password: hashPassword,
//       isVerifyEmail: false,
//     };
//     let users = await Admin.create(data);
//     //token generate
//     let infoObj = {
//       id: users._id,
//     };
//     let expiryInfo = {
//       expiresIn: "5d",
//     };
//     let token = await jwt.sign(infoObj, secretKey, expiryInfo);

//     await sendEmail({
//       from: "'jaihoo'<jayhotimro@gmail.com>",
//       to: [data.email],
//       subject: "Account Create.",
//       html: `<h1>Your account has been created successfully.</h1>
// <a href="${clientUrl}/verify-email?token=${token}">
// "${clientUrl}/verify-email?token=${token}"
// </a>
// `,
//     });
//     res.status(201).json({
//       success: true,
//       message: "admin create successfully.",
//       token: token,
//       result: users,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const verifyEmailAdmin = async (req, res, next) => {
//   try {
//     let tokenString = req.headers.authorization;
//     let token = tokenString.split(" ")[1];
//     //verify token
//     let infoObj = await jwt.verify(token, secretKey);
//     let userId = infoObj.id;
//     let users = await Admin.findByIdAndUpdate(
//       userId,
//       { isVerifyEmail: true },
//       { new: true }
//     );
//     res.status(200).json({
//       success: true,
//       massage: "User verify  successfully",
//       result: users,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const adminLogin = async (req, res, next) => {
//   try {
//     let email = req.body.email;
//     let password = req.body.password;
//     let admin = await Admin.findOne({ email: email });
//     if (admin) {
//       if (admin.isVerifyEmail) {
//         let isValidPassword = await bcrypt.compare(password, admin.password);
//         if (isValidPassword) {
//           let infoObj = {
//             id: admin._id,
//           };
//           let expiryInfo = {
//             expiresIn: "5d",
//           };
//           let token = await jwt.sign(infoObj, secretKey, expiryInfo);
//           res.status(201).json({
//             success: true,
//             message: "admin login successfully.",
//             result: admin,
//             token: token,
//           });
//         } else {
//           let error = new Error("credential does not match");
//           throw error;
//         }
//       } else {
//         let error = new Error("credential does not match");
//         throw error;
//       }
//     } else {
//       let error = new Error("credential does not found.");
//       throw error;
//     }
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getAllAdmin = async (req, res, next) => {
//   try {
//     let result = await Admin.find({});
//     res.status(200).json({
//       success: true,
//       message: "user read successfully.",
//       result: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getAdminById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await Admin.findById(id).populate("addedMovies");
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
