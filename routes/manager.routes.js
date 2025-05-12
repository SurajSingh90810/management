const express = require("express");
const routes=express.Router()
const { Managerprofile, ManagerchangePassword, employeeRegister, getAllEmployee, updateEmployee, deleteEmployee } = require("../controller/manager.controller");
const uploadImage = require("../middleware/imageUpload");


//  MANAGER

routes.get("/manager-profile",Managerprofile);
routes.post("/manager-change-password",ManagerchangePassword )


// EMPLOYEE


routes.post("/employee-register", uploadImage.single("employeeImage"), employeeRegister);
routes.get("/getEmployee", getAllEmployee);
routes.put("/update-employee/:id",uploadImage.single('employeeImage'), updateEmployee);
routes.delete("/delete-employee/:id", deleteEmployee);
module.exports = routes;
