const nodemailer = require("nodemailer");
const Admin = require("../models/adminRegister.model");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "singhsuraj90810@gmail.com",
    pass: "mthupfxizfvlfbwn",
  },
});

const sendOTPEmail = async (receiverEmail, OTP) => {
  await transporter.sendMail({
    from: "singhsuraj90810@gmail.com",
    to: receiverEmail,
    subject: "Reset Password",
    html: `<h2>Hello Admin,</h2><p>Your OTP is: <strong>${OTP}</strong></p>`,
  });
};

module.exports=sendOTPEmail