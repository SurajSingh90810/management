const Admin = require("../models/adminRegister.model");
const bcrypt = require("bcrypt");
const Manager=require("../models/manager.model");
const sendManagerEmailPassword = require("./manager_mail");
const fs=require("fs")
const path = require("path");

exports.adminRegister = async (req, res) => {
  try {
    const checkAdmin = await Admin.findOne({ email: req.body.email });

    if (checkAdmin) {
      return res.status(400).json({ message: "Admin Already Exist." });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    req.body.adminImage = imagePath;
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    const admin = await Admin.create({ ...req.body, password: hashPassword });

    return res
      .status(201)
      .json({ message: "Admin Register Succesfully", data: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllAdmin = async (req, res) => {
  let admin = await Admin.find();
  return res.json({ message: "View All Admin", data: admin });
};

exports.Adminprofile = async (req, res) => {
  return res.json({ message: "My Profile", data: req.admin });
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not Found" });
    }

    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, req.body, { new: true });
    return res.status(202).json({ message: "Update Admin Success", data: updatedAdmin });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.deleteAdmin = async (req, res) => {
  let admin = await Admin.findById(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not Found" });
  }
  admin = await Admin.findByIdAndDelete(admin._id);
  return res.status(200).json({ message: "Delete Admin Success" });
};



exports.AdminchangePassword = async (req, res) => {
  try {
    let adminId = req.admin._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res
        .status(404)
        .json({ message: "oldPassword and newPassword are required" });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      res.status(404).json({ message: "Admin is not Found" });
    }

    const matchPassword = await bcrypt.compare(oldPassword, admin.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashPassword;
    await admin.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};







                // MANAGER 







exports.managerRegister = async (req, res) => {
  try {
    const checkmanager = await Manager.findOne({ managerEmail: req.body.managerEmail });

    if (checkmanager) {
      return res.status(400).json({ message: "Manager Already Exists." });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    req.body.managerImage = imagePath;
    const plainPassword = req.body.password;
    const hashPassword = await bcrypt.hash(plainPassword, 10);

    const manager = await Manager.create({
      ...req.body,
      password: hashPassword,
    });

    await sendManagerEmailPassword(req.body.personalManagerEmail, req.body.managerEmail, plainPassword);

    return res.status(201).json({
      message: "Manager Registered Successfully",
      data: manager,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.getAllManager = async (req, res) => {
  let manager = await Manager.find();
  return res.json({ message: "View All Admin", data: manager });
}; 



exports.updateManager = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not Found" });
    }

    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
    }
      if(manager){
            if(req.file){
                if(manager.managerImage != ""){
                    let imagePath = path.join(__dirname, "..", manager.managerImage);
                    try {
                        await fs.unlinkSync(imagePath)
                    } catch (error) {
                        console.log("File misssing...");
                    }
                }
                let filePath = `/uploads/${req.file.filename}`;
                req.body.managerImage = filePath;
            }

          }

    const updatedManager = await Manager.findByIdAndUpdate(manager._id, req.body, { new: true });
    return res.status(202).json({ message: "Update Manager Success", data: updatedManager });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.deleteManager = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

   if(manager){

            if(manager.managerImage != ""){
                let imagePath = path.join(__dirname, "..", manager.managerImage);
                try {
                    await fs.unlinkSync(imagePath)
                } catch (error) {
                    console.log("File misssing...");
                }
            }
          }
    await Manager.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Manager deleted successfully" });
  } catch (err) {
    console.error("Error deleting manager:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};