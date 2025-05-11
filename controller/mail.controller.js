const nodemailer = require("nodemailer");
const Admin = require("../models/adminRegister.model");
const otpStore = {};

exports.sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found...");
      return res.status(404).json({ message: "Admin not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    await sendOTPEmail(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

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
