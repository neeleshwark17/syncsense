const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: [true, "Enter name"],
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Enter Phone Number"],
    unique:[true,"Enter unique Phone Number"]
  },
  language: {
    type: String,
    required: [true, "Enter language!"],
    lowercase: true,
  }
});


const Farmer = mongoose.model("farmer", farmerSchema);

module.exports = Farmer;
