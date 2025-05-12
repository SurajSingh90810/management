const jwt = require("jsonwebtoken");
const Admin = require("../models/adminRegister.model");
const Manager=require("../models/manager.model")
const Employee=require("../models/employee.model")

exports.verifyAdminToken = async (req, res, next) => {
  let authorization = req.headers["authorization"];

  if (!authorization) {
    return res.json({ message: "Please Login Now" });
  }
  let token = authorization.split(" ")[1];
  // console.log(token);
  let { adminId, email } = await jwt.verify(token, "test");
  console.log(adminId, email);
  let admin = await Admin.findById(adminId);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    return res.json({ message: "Invalid Token" });
  }
};




exports.verifyManagerToken = async (req, res, next) => {
  let authorization = req.headers["authorization"];

  if (!authorization) {
    return res.json({ message: "Please Login Now" });
  }
  let token = authorization.split(" ")[1];
  // console.log(token);
  let { managerId, email } = await jwt.verify(token, "test");
  console.log(managerId, email);
  let manager = await Manager.findById(managerId);
  if (manager) {
    req.manager = manager;
    next();
  } else {
    return res.json({ message: "Invalid Token" });
  }
};


exports.verifyEmployeeToken = async (req, res, next) => {
  let authorization = req.headers["authorization"];

  if (!authorization) {
    return res.json({ message: "Please Login Now" });
  }
  let token = authorization.split(" ")[1];
  // console.log(token);
  let { employeeId, email } = await jwt.verify(token, "test");
  console.log(employeeId, email);
  let employee = await Employee.findById(employeeId);
  if (employee) {
    req.employee = employee;
    next();
  } else {
    return res.json({ message: "Invalid Token" });
  }
};
