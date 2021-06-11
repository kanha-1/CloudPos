const express = require("express");
const router = express.Router();
const offercontroller = require("../../controller/offercontroller");
const authenticate = require("../../middleware/check-auth");


router.get("/:oId", authenticate, offercontroller.alloffers);
router.post("/", authenticate, offercontroller.addeoffers);
router.patch("/:oId", authenticate, offercontroller.updateoffers);
router.delete("/:oId", authenticate, offercontroller.deleteoffers);

module.exports = router;
