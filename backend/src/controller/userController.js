import bcrypt from "bcrypt";
import { User } from "../schema/model.js";
import { clientUrl, secretKey } from "../constant.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail.js";

export const createUser = async (req, res, next) => {
  try {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      password: hashPassword,
      isVerifyEmail: false,
    };
    let users = await User.create(data);
    //token generate
    let infoObj = {
      id: users._id,
    };
    let expiryInfo = {
      expiresIn: "5d",
    };
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "'jaihoo'<jayhotimro@gmail.com>",
      to: [data.email],
      subject: "Account Create.",
      html: `<h1>Your account has been created successfully.</h1>
<a href="${clientUrl}/verify-email?token=${token}">
"${clientUrl}/verify-email?token=${token}"
</a>
`,
    });
    res.status(201).json({
      success: true,
      message: "user create successfully.",
      token: token,
      result: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyEmailUser = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let token = tokenString.split(" ")[1];
    //verify token
    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj.id;
    let users = await User.findByIdAndUpdate(
      userId,
      { isVerifyEmail: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      massage: "User verify  successfully",
      result: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
    if (user) {
      if (user.isVerifyEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            id: user._id,
          };
          let expiryInfo = {
            expiresIn: "5d",
          };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(201).json({
            success: true,
            message: "user login successfully.",
            result: user,
            token: token,
          });
        } else {
          let error = new Error("credential does not match");
          throw error;
        }
      } else {
        let error = new Error("credential does not match");
        throw error;
      }
    } else {
      let error = new Error("credential does not found.");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    let users = await User.find({});
    res.status(201).json({
      success: true,
      message: "Create successfully.",
      result: users,
    });
  } catch (error) {
    // return next(err);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readSpecificUser = async (req, res, next) => {
  try {
    let _id = req.params.id;
    let users = await User.findById(_id);
    res.status(200).json({
      success: true,
      message: "user read successfully.",
      result: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    let _id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let users = await User.findByIdAndUpdate(_id, data, { new: true });
    res.status(201).json({
      success: true,
      message: " user update successfully",
      result: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    let _id = req.params.id;
    let users = await User.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "user delete successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// //40 min
// import { User } from "../schema/model.js";
// export const createUser = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (
//     !name &&
//     name.trim() === "" &&
//     !email &&
//     email.trim() === "" &&
//     !password &&
//     password.trim() === ""
//   ) {
//     return res.status(422).json({ message: "Invalid Inputs" });
//   }

//   let user;
//   try {
//     user = new User({ name, email, password });
//     user =await user.save();
//   } catch (err) {
//     return next(err);
//   }
//   if (!user) {
//     return res.status(500).json({ message: "unexpected error occurred" });
//   }
//   return res.status(201).json({
//     user,
//   });
// };
// //       let hashPassword = await bcrypt.hash(data.password, 10);
// //       data = {
// //         ...data,
// //         password: hashPassword,
// //         // isVerifyEmail: false,
// //       };
// //       let users = await User.create(data);
// //       res.status(201).json({
// //         success: true,
// //         message: "Create successfully.",
// //         result: users,
// //       });
// //     } catch (error) {
// //       res.status(400).json({
// //         success: false,
// //         message: error.message,
// //       });
// //     }
// //   };
//   export const getAllUser = async (req, res, next) => {
//   try {
//     let users = await User.find({});
//     res.status(201).json({
//       success: true,
//       message: "Create successfully.",
//       result: users,
//     });
//   } catch (error) {
//     // return next(err);
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
