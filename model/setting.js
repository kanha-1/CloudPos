var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ShopSetting = new Schema({
  CompanyName: { type: String },
  FirstLine: { type: String },
  SecondLine: { type: String },
  Contact: { type: Number },
  Printer: { type: Number },
});
var ShopSetting = mongoose.model("shopsetting", ShopSetting);
module.exports = ShopSetting;
