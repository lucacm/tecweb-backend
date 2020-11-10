var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/userlist", function (req, res) {
	var db = require("../db");
	var Users = db.Mongoose.model(
		"usercollection",
		db.UserSchema,
		"usercollection"
	);
	Users.find({})
		.lean()
		.exec(function (e, docs) {
			console.log(docs);
			res.json(docs);
			res.end();
		});
});

router.get("/newuser", function (req, res) {
	res.render("newuser", { title: "Add New User" });
});

/* GET ONE user */
router.get("/user/:id", function (req, res, next) {
	var db = require("../db");
	var User = db.Mongoose.model(
		"usercollection",
		db.UserSchema,
		"usercollection"
	);
	User.find({ _id: req.params.id })
		.lean()
		.exec(function (e, docs) {
			res.json(docs);
			res.end();
		});
});

router.post("/users/", function (req, res, next) {
	var db = require("../db");
	var User = db.Mongoose.model(
		"usercollection",
		db.UserSchema,
		"usercollection"
	);
	var newuser = new User({ user: req.body.user, senha: req.body.senha });
	newuser.save(function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json(newuser);
		res.end();
	});
});

/* PUT ONE user: atualizar */
router.put("/users/:id", function (req, res, next) {
	var db = require("../db");
	var User = db.Mongoose.model(
		"usercollection",
		db.UserSchema,
		"usercollection"
	);
	User.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ upsert: true },
		function (err, doc) {
			if (err) {
				res.status(500).json({ error: err.message });
				res.end();
				return;
			}
			res.json(req.body);
			res.end();
		}
	);
});

/* DELETE ONE user. */
router.delete("/users/:id", function (req, res, next) {
	var db = require("../db");
	var User = db.Mongoose.model(
		"usercollection",
		db.UserSchema,
		"usercollection"
	);
	User.find({ _id: req.params.id }).remove(function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json({ success: true });
		res.end();
	});
});

router.post("/adduser", function (req, res) {
	var db = require("../db");
	var userName = req.body.user;
	var senha = req.body.senha;
	var Users = db.Mongoose.model(
		"usercollection",
		db.UserSchema,
		"usercollection"
	);
	var user = new Users({ user: userName, senha: senha });
	user.save(function (err) {
		if (err) {
			console.log("Error! " + err.message);
			return err;
		} else {
			console.log("Post saved");
			res.redirect("userlist");
		}
	});
});

module.exports = router;
