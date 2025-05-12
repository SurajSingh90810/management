const Admin = require("../models/adminRegister.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTPEmail=require("../controller/mail.controller")



exports.login = async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({ message: "User not Found" });
    }
    let matchPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password is Incorrect" });
    }

    let token = await jwt.sign(
      { adminId: admin._id, email: admin.email },
      "test"
    );

    return res.status(200).json({ message: "Login Successfully", token,admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

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
    otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

    await sendOTPEmail(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};


exports.verifyOTPAndChangePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const stored = otpStore[email];

    if (
      !stored ||
      stored.otp !== parseInt(otp) ||
      Date.now() > stored.expiresAt
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashPassword;
    await admin.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error changing password" });
  }
};
