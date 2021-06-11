var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var offerSchema = new Schema({
  offername: { type: String },
  offerdiscount: { type: Number },
  offercode: { type: String },
});
var offers = mongoose.model("offers", offerSchema);
module.exports = offers;
