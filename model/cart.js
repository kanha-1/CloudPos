var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var cartinfoSchema = new Schema({
  Total: { type: Number },
  name: { type: String },
  offers: { type: String },
});
var cartinfos = mongoose.model("cartinfos", cartinfoSchema);
module.exports = cartinfos;
