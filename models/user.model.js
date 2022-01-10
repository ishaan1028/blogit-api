const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        minlength: 3,
        maxlength: 12,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 100,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema, "users");