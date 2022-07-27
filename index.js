var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userController = require("./controllers/userController");

const connectionUrl = process.env.MONGO_URI;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Local Connection UNCOMMENT THE FOLLOWING FOR LOCAL CONNECTION
// mongoose.connect("mongodb://127.0.0.1:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

global.conn = mongoose.connection;

conn.once("open", (err) => {
  if (err) console.log(">>>>>>>>>>>", err);
  console.log("->DB CONNECTED");
});

//cookie age and signing
const maxAge = 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
// --------------------------------------------------- ---------------------------------------------------

router.get("/", (req, res) => {
  res.status(200).send("API IS LIVE BITCH!!");
});

router.post("/createFarmer", userController.createUser);
router.post("/createScheduleData", userController.createScheduleData);
router.post("/createFarmerData", userController.createFarmerData);
router.get("/allRecords", userController.allRecords);
router.get("/growingCrop", userController.growingCrop);
router.get("/priceCalc", userController.priceCalc);


module.exports = router;
