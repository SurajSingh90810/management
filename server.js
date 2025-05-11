const express = require("express");
const dbConnect = require("./config/Connectdb");
const app = express();
const cors = require("cors");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/index.routes"));
app.listen(3000, () => {
  console.log("Server is Connencted to 3000");
});
