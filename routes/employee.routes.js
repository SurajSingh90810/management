const express = require("express");
const { Employeeprofile, EmployeechangePassword } = require("../controller/employee.controller");
const routes = express.Router();

routes.get("/employee-profile",Employeeprofile)
routes.post("/employee-change-password/:id",EmployeechangePassword)
module.exports=routes