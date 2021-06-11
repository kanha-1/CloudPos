const express = require("express");
const router = express.Router();
const cartdetails = require("../../model/cart");
const dashboardcontroller = require("../../controller/dashboardcontroller");
router.get("/", (req, res, next) => {
  next();
});
//This Route is uded to get details of all items in cart.
router.get("/cart", dashboardcontroller.cartDetails);
//We can use this to add new item to cart by product name
router.post("/cart", dashboardcontroller.postProductCart);
//Increase or decrease product quantityt by name
router.patch("/:id", dashboardcontroller.changeProductQuantity);
//Delete Product
router.delete("/:id", dashboardcontroller.deleteProductCart);
//We use this route to add offer using offer code
router.get("/cart/offer/:id", (req, res, next) => {
  var offerid = req.params.id;
  console.log(offerid);
  cartdetails
    .findOne({})
    .exec()
    .then((data) => {
      if (!data) {
        //console.log(data);
        //data.offers = offerid;
        var data = new cartdetails({
          offers: offerid,
        });
        data.save(function (err, data) {
          res.json({ message: "Offer Applied Succesfuly" });
        });
      } else {
        data.offers = offerid;
        data.save(function (err, data) {
          console.log(data);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//We can use this route to get the total of the cart
router.get("/total", dashboardcontroller.currentTotal);
//After applying offer and calculating total , we checkout.
//When we checkout the cart is cleared , and invoice is created.
//Quantities of the product is decreased in stock
router.get("/checkout", dashboardcontroller.checkOut);

module.exports = router;
