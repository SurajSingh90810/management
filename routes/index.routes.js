const express = require("express");

const { verifyAdminToken } = require("../middleware/verifyToken");
const { adminRegister } = require("../controller/admin.controller");
const uploadImage = require("../middleware/imageUpload");
const {
  verifyOTPAndChangePassword,
  login,
} = require("../controller/login.controller");
const { sendEmail } = require("../controller/mail.controller");

const app = express.Router();

app.post("/register", uploadImage.single("adminImage"), adminRegister);
app.post("/login", login);
app.post("/send-otp", sendEmail);
app.post("/verify-otp", verifyOTPAndChangePassword);
app.use("/admin", verifyAdminToken, require("../routes/admin.routes"));

module.exports = app;
