// importing modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

// export userschema
module.exports = mongoose.model("User", UserSchema);