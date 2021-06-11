var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var cartSchema = new Schema({
	Product: [
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
	Customer: { type: String },
	Offer: { type: String },
	SubTotal: { type: Number },
});
var cart = mongoose.model("cart", cartSchema);
module.exports = cart;
