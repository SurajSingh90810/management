const Employee=require("../models/employee.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


exports.Employeelogin = async (req, res) => {
  try {
    let employee = await Employee.findOne({ employeeEmail: req.body.employeeEmail });
    if (!employee) {
      return res.status(400).json({ message: "User not Found" });
    }
    let matchPassword = await bcrypt.compare(req.body.password, employee.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password is Incorrect" });
    }

    let token = await jwt.sign(
      { employeeId: employee._id, employeeEmail: employee.employeeEmail },
      "test"
    );

    return res.status(200).json({ message: "Login Successfully", token,employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.Employeeprofile = async (req, res) => {
  return res.json({ message: "My Profile", data: req.employee });
};


exports.EmployeechangePassword = async (req, res) => {
  try {
    let employeeId = req.employee._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res
        .status(404)
        .json({ message: "oldPassword and newPassword are required" });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      res.status(404).json({ message: "Employee is not Found" });
    }

    const matchPassword = await bcrypt.compare(oldPassword, employee.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    employee.password = hashPassword;
    await employee.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
