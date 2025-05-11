const Admin = require("../models/adminRegister.model");
const bcrypt = require("bcrypt");

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

exports.profile = async (req, res) => {
  return res.json({ message: "My Profile", data: req.admin });
};

exports.updateAdmin = async (req, res) => {
  let admin = await Admin.findById(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not Found" });
  }
  admin = await Admin.findByIdAndUpdate(admin._id, req.body, { new: true });
  return res.status(202).json({ message: "Update Admin Success", data: admin });
};

exports.deleteAdmin = async (req, res) => {
  let admin = await Admin.findById(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not Found" });
  }
  admin = await Admin.findByIdAndDelete(admin._id);
  return res.status(200).json({ message: "Delete Admin Success" });
};

exports.changePassword = async (req, res) => {
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
