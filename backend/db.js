var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projeto2');

var userSchema = new mongoose.Schema({
    user: String,
    senha: String
}, { collection: 'usercollection' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }