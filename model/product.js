var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var productsSchema = new Schema({
	name: { type: String },
	category: { type: String },
	price: { type: Number },
	discount: { type: Number },
	tax: { type: Number },
	stock: { type: Number },
});
var products = mongoose.model("products", productsSchema);
module.exports = products;
