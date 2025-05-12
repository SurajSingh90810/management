const mongoose = require("mongoose");

const managerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    managerEmail: {
      type: String,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    salary: {
      type: String,
    },
    managerImage: {
      type: String,
    },
    personalManagerEmail:{
      type:String
    }
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const manager = mongoose.model("Manager", managerSchema);

module.exports = manager;
