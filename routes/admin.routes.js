const express = require("express");
const {
  getAllAdmin,
  profile,
  updateAdmin,
  deleteAdmin,
  changePassword,
} = require("../controller/admin.controller");
const {
  verifyOTPAndChangePassword,
  sendEmail,
} = require("../controller/login.controller");

const routes = express.Router();

routes.get("/getAdmin", getAllAdmin);
routes.get("/my-profile", profile);
routes.put("/update-admin/:id", updateAdmin);
routes.delete("/delete-admin/:id", deleteAdmin);
routes.post("/change-password/:id", changePassword);

module.exports = routes;
