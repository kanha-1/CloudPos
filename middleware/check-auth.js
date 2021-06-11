const User = require("../model/user");
const jwt = require("jsonwebtoken");
//authentication by decoding jwt token.
module.exports = (req, res, next) => {
  const token = req.header("auth_token");
  jwt.verify(token, "iuyiuweyiuyhewrf8743", (err, data) => {
    if (err)
      return res.status(401).json({
        message: "token is invalid please login",
      });
    else {
      req.user = data;
      console.log("successful login");
      next();
    }
  });
};
