const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        maxlength: 200,
        required: true,
        trim: true
    },
    commentBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    ofBlog: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema, "comments");