const Farmer = require("../models/Farmer");
const { phone } = require("phone");
const FarmerData = require("../models/FarmerData");
const ScheduleData = require("../models/ScheduleData");
const moment = require("moment");

module.exports.createUser = async (req, res) => {
  const reqObject = {
    farmerName: req.body.farmerName,
    phoneNumber: "",
    language: req.body.language,
  };

  const { phoneNumber, countryIso2, countryIso3, countryCode, isValid } = phone(
    req.body.phoneNumber
  );

  if (isValid) {
    reqObject.phoneNumber = phoneNumber;
    let results = await Farmer.findOne({
      phoneNumber: reqObject.phoneNumber.trim(),
    }).exec();

    if (results) {
      res.json({ msg: "Already Exists!" });
    } else {
      await Farmer.create(reqObject, (err, items) => {
        if (err) {
          res.json({ msg: "Error!", err: err });
        } else {
          res.json({ msg: "ok", obj: items });
        }
      });
    }
  } else {
    res.json({ msg: "Invalid Phone" });
  }
};

module.exports.createScheduleData = async (req, res) => {
  // SCHEDULE DATA
  let ress = await Farmer.findOne({
    phoneNumber: req.body.phoneNumber.trim(),
  }).exec();
  if (!ress) {
    res.json({ msg: "No Farmer record!" });
  } else {
    let farmerRecord = await FarmerData.findOne({
      farmerId: ress.id,
    }).exec();
    if (!farmerRecord) {
      res.json({ msg: "Create Farmer's Data record first!" });
    } else {
      if (
        moment(farmerRecord.sowingDate).utc().format("YYYY-MM-DD") <
        req.body.afterSowing
      ) {
        
        let re = await ScheduleData.findOne({
          farmerId: ress.id,
        }).exec();

        if (re) {
          let scheduleObject = {
            afterSowing: req.body.afterSowing,
            fertilizer: req.body.fertilizer,
            quantity: req.body.quantity,
          };
          ScheduleData.findOneAndUpdate(
            { farmerId: ress.id},
            scheduleObject,
            (er, rs) => {
              if (er) res.json({ msg: "Error in Updating!" });
              else {
                res.json({ msg: "Updated" });
              }
            }
          );
        } else {
          let scheduleObject = {
            farmerId: ress._id,
            afterSowing: req.body.afterSowing,
            fertilizer: req.body.fertilizer,
            quantity: req.body.quantity,
          };

          ScheduleData.create(scheduleObject, (errors, values) => {
            if (errors) {
              res.json({ msg: "errorScheduleData-> :-(", err: errors });
            } else {
              res.json({ msg: "ok" });
            }
          });
        }
      } else {
        res.json({ msg: "After Sowing date should be after sowing!!" });
      }
    }
  }
};

// FARMER DATA
module.exports.createFarmerData = async (req, res) => {
  let ress = await Farmer.findOne({
    phoneNumber: req.body.phoneNumber.trim(),
  });

  if (!ress) {
    res.json({ msg: "No Record with this number!" });
  } else {
    let fData = await FarmerData.findOne({ farmerId: ress.id }).exec();
    if (!fData) {
      let farmerDataObject = {
        farmerId: ress._id,
        village: req.body.village,
        crop: req.body.crop,
        sowingDate: req.body.sowingDate,
      };
      FarmerData.create(farmerDataObject, (errors, values) => {
        if (errors) {
          res.json({ msg: "errorFarmerData-> :-(", err: errors });
        } else {
          res.json({ msg: "ok" });
        }
      });
    } else {
      let farmerDataObject = {
        village: req.body.village,
        crop: req.body.crop,
        sowingDate: req.body.sowingDate,
      };
      FarmerData.findOneAndUpdate(
        { farmerId: ress.id },
        farmerDataObject,
        (er, rs) => {
          if (er) res.json({ msg: "Error in Updating!" });
          else {
            res.json({ msg: "Updated" });
          }
        }
      );
    }
  }
};

module.exports.allRecords = async (req, res) => {
  let farmers = await Farmer.find({}).exec();
  let schedule = await ScheduleData.find({}).exec();
  let farmerDatas = await FarmerData.find({}).exec();
  let obj = {
    farmers: farmers,
    schedule: schedule,
    farmerDatas: farmerDatas,
  };
  res.json({ msg: "ok", obj });
};

module.exports.growingCrop = async (req, res) => {
  let farmers = await Farmer.find({}).exec();
  let farmerDatas = await FarmerData.find({}).exec();
  let obj = {
    farmers: farmers,
    farmerDatas: farmerDatas,
  };
  res.json({ msg: "ok", obj });
};

module.exports.priceCalc = async (req, res) => {
  let farmers = await Farmer.find({}).exec();
  let schedule = await ScheduleData.find({}).exec();
  let obj = {
    farmers: farmers,
    schedule: schedule,
  };
  res.json({ msg: "ok", obj });
};
