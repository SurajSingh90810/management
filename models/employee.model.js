const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    employeeEmail: {
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
    employeeImage: {
      type: String,
    },
    personalEmployeeEmail:{
      type:String
    },
    address:{
        type:String
    }
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const employee = mongoose.model("Employee", employeeSchema);

module.exports = employee;
