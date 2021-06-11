var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var billSchema = new Schema({
  Product: [
    [
      {
        name: String,
        category: String,
        price: Number,
        discount: Number,
        tax: Number,
        pid: String,
        discounted_price: Number,
        quantity: Number,
      },
    ],
  ],
  Customer: { type: String },
  Pmethod: { type: String },
  Number: { type: Number },
  Offer: { type: String },
  SubTotal: { type: Number },
});
var bill = mongoose.model("bill", billSchema);
module.exports = bill;
