const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    hobbies: {
      type: Array,
    },
    adminImage: {
      type: String,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;
