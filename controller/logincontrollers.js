const jwt = require("jsonwebtoken");
module.exports = {
  facebookoAuth: (req, res, next) => {
    // Generate token
    console.log("hi");
    var user = req.user;
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
    console.log(token);
    res.send({ token: token });
  },
};
