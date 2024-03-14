import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { Register } from "../schema/model.js";
// import { secretKey } from "../constant.js";
export let createRegisterController = async (req, res, next) => {
  try {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashPassword,
    };
    let result = await Register.create(data);

    // let infoObj = {
    //   id: result._id,
    // };
    // let expiryInfo = {
    //   expiresIn: "5d",
    // };
    // let token =await jwt.sign(infoObj,secretKey,expiryInfo)

    // await sendEmail({
    //   from: "'JAIHOO'<jayhotimro@gmail.com",
    //   to: data.email,
    //   subject: "account create.",
    //   html: `<h1>your account has been created successfully.</h1>
    // <a href:"${clientUrl}/verify-email?token${token}></a>
    // `,
    // });

    res.status(201).json({
      success: true,
      message: "register create successfully.",
      data: result,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};
