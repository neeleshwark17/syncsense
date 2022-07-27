const mongoose = require("mongoose");
Schema = mongoose.Schema;

const scheduleDataSchema = new mongoose.Schema({
  farmerId: { type: Schema.Types.ObjectId, ref: "farmer", require: true },
  afterSowing: {
    type: Date,
    required: [true, "Enter village!"],
    lowercase: true,
  },
  fertilizer: {
    type: Object,
    required: [true, "Enter Fertilizer!"],
  },
  quantity: {
    type: String,
    // enum: ["ton", "kg", "g", "L", "mL", "ton"],
    required: [true, "Enter Date!"],
    lowercase: true,
  },
});

const ScheduleData = mongoose.model("ScheduleData", scheduleDataSchema);
module.exports = ScheduleData;
