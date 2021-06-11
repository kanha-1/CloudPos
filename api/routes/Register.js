const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../model/user");
router.post("/", (req, res) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: "Email Id exists",
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						console.log(err);
					} else {
						const user = new User({
							email: req.body.email,
							name: req.body.name,
							password: hash,
						});
						user
							.save()
							.then((data) => {
								res.json({ message: "New Company Added", data });
							})
							.catch((err) => {
								return res.status(409).json({ err });
							});
					}
				});
			}
		});
});

module.exports = router;
