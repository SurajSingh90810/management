const express = require("express");

const { verifyAdminToken, verifyManagerToken } = require("../middleware/verifyToken");
const { adminRegister } = require("../controller/admin.controller");
const uploadImage = require("../middleware/imageUpload");
const {
  Adminlogin,
  AdminsendEmail,
  AdminverifyOTPAndChangePassword,
} = require("../controller/login.controller");
const { Managerlogin, ManagersendEmail, ManagerverifyOTPAndChangePassword } = require("../controller/manager.controller");

const app = express.Router();

//  ADMIN
app.use("/admin", verifyAdminToken, require("../routes/admin.routes"));
app.post("/register", uploadImage.single("adminImage"), adminRegister);
app.post("/login", Adminlogin);
app.post("/send-otp", AdminsendEmail);
app.post("/verify-otp", AdminverifyOTPAndChangePassword);


//  MANAGER
app.use("/manager",verifyManagerToken,require("../routes/manager.routes"))
app.post("/manager-login", Managerlogin);
app.post("/manager-send-otp", ManagersendEmail);
app.post("/manager-verify-otp", ManagerverifyOTPAndChangePassword);





module.exports = app;
