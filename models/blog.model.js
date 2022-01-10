const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 100,
        required: true,
    },
    body: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 20000,
        required: true,
    },
    categories: {
        type: Array,
        required: true
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/hiddencloud1111/image/upload/v1641743553/blog_def_igh8bc.jpg"
    },
    photoId: {
        type: String,
        default: ""
    },
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema, "blogs");