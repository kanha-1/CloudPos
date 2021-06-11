const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/check-auth");

const productdcontroller = require("../../controller/productscontroller");

//GET ALL PRODUCT
router.get("/:pId", authenticate, productdcontroller.totalproducts);

//This Method is used to get the name ,category, price,tax,Discountof a certain or all Products
router.post("/add", authenticate, productdcontroller.addproducts);

//Update Product By Id
router.patch("/:pId", authenticate, productdcontroller.updatepraducts);

//Delete a product

router.delete("/:pId", authenticate, productdcontroller.deleteproducts);

module.exports = router;
