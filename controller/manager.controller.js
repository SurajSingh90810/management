const Manager=require("../models/manager.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const ManagerSendOTPEmail=require("../controller/mail.controller")


exports.Managerlogin = async (req, res) => {
  try {
    let manager = await Manager.findOne({ managerEmail: req.body.managerEmail });
    if (!manager) {
      return res.status(400).json({ message: "User not Found" });
    }
    let matchPassword = await bcrypt.compare(req.body.password, manager.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password is Incorrect" });
    }

    let token = await jwt.sign(
      { managerId: manager._id, managerEmail: manager.managerEmail },
      "test"
    );

    return res.status(200).json({ message: "Login Successfully", token,manager });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.Managerprofile = async (req, res) => {
  return res.json({ message: "My Profile", data: req.manager });
};




exports.ManagerchangePassword = async (req, res) => {
  try {
    let managerId = req.manager._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res
        .status(404)
        .json({ message: "oldPassword and newPassword are required" });
    }

    const manager = await Manager.findById(managerId);

    if (!manager) {
      res.status(404).json({ message: "Manager is not Found" });
    }

    const matchPassword = await bcrypt.compare(oldPassword, manager.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    manager.password = hashPassword;
    await manager.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const otpStore = {};



exports.ManagersendEmail = async (req, res) => {
  try {
    const { managerEmail } = req.body;
    const manager = await Manager.findOne({ managerEmail });

    if (!manager) {
      console.log("Manager not found...");
      return res.status(404).json({ message: "Manager not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[managerEmail] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

    await ManagerSendOTPEmail(managerEmail, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};



exports.ManagerverifyOTPAndChangePassword = async (req, res) => {
  try {
    const { managerEmail, otp, newPassword } = req.body;
    const stored = otpStore[managerEmail];

    if (
      !stored ||
      stored.otp !== parseInt(otp) ||
      Date.now() > stored.expiresAt
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const manager = await Manager.findOne({ managerEmail });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    manager.password = hashPassword;
    await manager.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error changing password" });
  }
};