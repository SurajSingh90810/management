const express = require("express");
const {
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
  managerRegister,
  getAllManager,
  Adminprofile,
  AdminchangePassword,
  updateManager,
  deleteManager,
  Managerprofile,
} = require("../controller/admin.controller");

const uploadImage = require("../middleware/imageUpload");

const routes = express.Router();

//  ADMIN

routes.get("/getAdmin", getAllAdmin);
routes.get("/my-profile", Adminprofile);
routes.put("/update-admin/:id", updateAdmin);
routes.delete("/delete-admin/:id", deleteAdmin);
routes.post("/change-password/:id", AdminchangePassword);




//  MANAGER

routes.get("/getManager", getAllManager);
routes.put("/update-manager/:id",uploadImage.single('managerImage'), updateManager);
routes.delete("/delete-manager/:id", deleteManager);
routes.post("/manager-register", uploadImage.single("managerImage"), managerRegister);

module.exports = routes;
