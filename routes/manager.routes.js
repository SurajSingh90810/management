const express = require("express");
const routes=express.Router()
const { Managerprofile, ManagerchangePassword } = require("../controller/manager.controller");


routes.get("/manager-profile",Managerprofile);
routes.post("/manager-change-password",ManagerchangePassword )
module.exports = routes;
