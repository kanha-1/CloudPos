const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/check-auth");
const User = require("../../model/user");
require("dotenv/config");
const mongoose = require("mongoose");
router.get("/branches", authenticate, (req, res, next) => {
	const userdetails = req.user;
	console.log(userdetails);
	var branch = userdetails.branches;
	User.findOne({ _id: userdetails.user_id }).exec((err, data) => {
		if (data.branches.length >= 1) {
			res.json({
				branches: data.branches,
				message: "Open Pos system of respective branch to use it",
			});
		} else {
			res.json({ message: "You have not added any branches please add them" });
		}
	});
});
router.post("/Branches", authenticate, (req, res, next) => {
	var branch = req.body.branchname;
	const companyid = req.user.user_id;
	console.log(companyid);
	var branchdetails = {};
	if (branch) {
		User.findOne({ _id: companyid }, function (err, user) {
			if (user) {
				branchdetails.Connect = companyid.concat(branch);
				branchdetails.Name = branch;

				user.branches.push(branchdetails);
				res.json(user);
				user.save(function (err, data) {
					console.log(data);
				});
			}
		});
	}
});
router.get("/:branchname", authenticate, (req, res, next) => {
	var branchname = req.params.branchname;
	User.findOne({ branches: { $elemMatch: { Name: branchname } } })
		.exec()
		.then((data) => {
			if (data) {
				var dname = data.branches[0].Connect;
				const mongoose = require("mongoose");
				mongoose
					.connect(process.env.DB_CONNECTION + dname, {
						useNewUrlParser: true,
						useUnifiedTopology: true,
						useCreateIndex: true,
					})
					.then(function () {
						console.log("data base connected successfully to ", dname);
						res
							.status(200)
							.json({ message: "data base connected successfully to ", dname });
					})
					.catch(function (err) {
						console.log(err.message);
					});
			} else {
				return res.status(404).json({ message: "Branch not found" });
			}
		});
});
router.get("/branch/disconnect", authenticate, (req, res) => {
	const mongoose = require("mongoose");
				mongoose
					.connect(process.env.DB_CONNECTION, {
						useNewUrlParser: true,
						useUnifiedTopology: true,
						useCreateIndex: true,
					})
		.then(function () {
			res.json(
				"original data base connected successfully , now you can change branch",
			);
		})
		.catch(function (err) {
			console.log(err.message);
		});
});

module.exports = router;
