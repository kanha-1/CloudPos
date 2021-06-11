const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const logincontroller = require("../../controller/logincontrollers");
router
  .route("/oauth/facebook")
  .post(
    passport.authenticate("facebookToken", { session: false }),
    logincontroller.facebookoAuth
  );

router.post("/", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) return res.status(401).json({ err });
        if (result) {
          var token = jwt.sign(
            {
              email: user[0].email,
              name: user[0].name,
              user_id: user[0]._id,
              branches: user[0].branches,
            },
            "iuyiuweyiuyhewrf8743",
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message:
              "Login is succesfull , Here is your token . User should send it to access pages",
            token: token,
          });
        } else {
          return res
            .status(401)
            .json({ message: "incorrect password.Please try again" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fb", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../view/login.html"));
});
module.exports = router;
