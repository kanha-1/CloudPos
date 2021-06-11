const express = require("express");
const router = express.Router();
const offercontroller = require("../../controller/offercontroller");
const authenticate = require("../../middleware/check-auth");
