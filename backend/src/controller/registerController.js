import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { clientUrl, secretKey } from "../constant.js";
import { Register } from "../schema/model.js";
import { sendEmail } from "../utils/sendMail.js";
export const createRegisterController = async (req, res, next) => {
  try {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      password: hashPassword,
      isVerifyEmail: false,
    };
    let result = await Register.create(data);
    //token generate
    let infoObj = {
      id: result._id,
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
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let token = tokenString.split(" ")[1];
    //verify token
    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj.id;
    let result = await Register.findByIdAndUpdate(
      userId,
      { isVerifyEmail: true },
      { new: true }
    );
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
export const loginController = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await Register.findOne({ email: email });
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
export const myProfileController = async (req, res, next) => {
  try {
    let id = req._id;
    let result = await Register.findById(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "my-profile read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to read profile.",
    });
  }
};
export const profileUpdateController = async (req, res, next) => {
  try {
    let id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await Register.findByIdAndUpdate(id, data, { new: true });
    // console.log(result)
    res.status(201).json({
      success: true,
      message: "profile update successfully.",
      Data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updatePasswordController = async (req, res, next) => {
  try {
    let id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let data = await Register.findByIdAndUpdate(id);
    let hashPassword = data.password;
    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);
    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);
      let result = await Register.findByIdAndUpdate(
        id,
        { password: newHashPassword },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "password update successfully.",
        data: result,
      });
    } else {
      let error = new Error("credential does not match.");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readAllController = async (req, res, next) => {
  try {
    let result = await Register.find({});
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

export const readSpecificController = async (req, res, next) => {
  try {
    let id = req.params._id;
    let result = await Register.findById(id);
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
export const updateRegisterController = async (req, res, next) => {
  try {
    let id = req.params._id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await Register.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: " register update successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteRegisterController = async (req, res, next) => {
  try {
    let id = req.params._id;
    let result = await Register.findByIdAndDelete(id);
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
export const forgetPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await Register.findOne({ email: email });
    if (result) {
      let infoObj = {
        id: result._id,
      };
      let expiryInfo = {
        expiresIn: "5d",
      };
      let token = await jwt.sign(infoObj, secretKey, expiryInfo);

      await sendEmail({
        from: "'jaihooo'<jayhotimro@gmail.com>",
        to: email,
        subject: "rest password",
        html: `<h1>Please click given link to reset your password.</h1>
        <a href="${clientUrl}/reset-password?token=${token}">"${clientUrl}/reset-password?token=${token}"</a>`,
      });
      res.status(200).json({
        success: true,
        message: "to reset password link has been sent to the email.",
        token: token,
      });
    } else {
      let error = new Error("email does not exits.");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await Register.findByIdAndUpdate(
      req._id,
      { password: hashPassword },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "password reset successFully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
