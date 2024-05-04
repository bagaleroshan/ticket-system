import nodemailer from 'nodemailer';
import { pass, user } from '../constant.js';

let transporterInfo = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,

  auth: {
   
    user: user,
    pass: pass,
  },
};

export let sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo); //transporter gives from information
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log('error has occurred', error.message);
  }
};

