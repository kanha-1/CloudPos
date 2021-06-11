const express = require("express");
const router = express.Router();
const billingcontroller = require("../../controller/billingcontroller");
const request = require("request");
const bill = require("../../model/bills");

// Get all bills 
router.get("/all", billingcontroller.AllBills);
//Get bill by customer name
router.get("/:id", billingcontroller.BillByCustomer);
//Delete bill by customer name
router.delete("/:id", billingcontroller.DeleteBillByCustomer);

router.get("/qr/:id", (req, res) => {
  bill
    .findOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      const url =
        "https://upiqr.in/api/qr?name=Shop%20&vpa=9686655876@ybl&amount=" +
        result.SubTotal.toFixed(2);
      //result.SubTotal;
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.set({ "Content-Type": "image/svg+xml" });
          res.send(response.body);
        }
      });
    });
});

module.exports = router;
