const mongoose = require("mongoose");
Schema = mongoose.Schema;

const farmerDataSchema = new mongoose.Schema({
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: "farmer",
    require: true,
  },
  village: {
    type: String,
    required: [true, "Enter village!"],
    lowercase: true,
  },
  crop: {
    type: String,
    required: [true, "Enter Crop!"],
    lowercase: true,
  },
  sowingDate: {
    type: Date,
    required: [true, "Enter Date!"],
    lowercase: true,
  },
});

const FarmerData = mongoose.model("farmerData", farmerDataSchema);

module.exports = FarmerData;
