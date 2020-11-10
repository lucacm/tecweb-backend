var mongoose = require("mongoose");

console.log(process.env.MONGO_CONNECTION);

const uri =
	process.env.MONGO_CONNECTION || "mongodb://localhost:27017/projeto2";

mongoose.connect(uri);

var userSchema = new mongoose.Schema(
	{
		user: String,
		senha: String,
	},
	{ collection: "usercollection" }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema };
