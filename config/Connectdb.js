const mongoose = require("mongoose");

const ConnectDB = async (req, res) => {
  await mongoose
    .connect(
      "mongodb+srv://singhsuraj90810:suraj123@cluster0.cduovou.mongodb.net/Company"
    )
    .then(() => {
      console.log("Mongo DB Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = ConnectDB();
