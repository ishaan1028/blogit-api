require("dotenv").config();
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const cloudinary = require("../utils/cloudinary");

module.exports = {

    async createBlog(req, res) {

        try {

            const { title, body, categories, photo, photoId } = req.body;

            const newBlog = { blogBy: req.user._id, title, body, categories };

            if (photo.length) newBlog.photo = photo;

            if (photoId.length) newBlog.photoId = photoId;

            const blog = await Blog.create(newBlog);

            res.send(blog);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async updateBlog(req, res) {

        try {

            const { title, body, categories, photo, photoId } = req.body;

            const queryBody = { title, body, categories };

            if (photoId.length) {
                queryBody.photo = photo;
                queryBody.photoId = photoId;
            }

            const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, {
                $set: { ...queryBody }
            });

            // Delete old pic from cloud
            if (photoId.length && blog.photoId.length) {
                await cloudinary.uploader.destroy(blog.photoId);
            }

            res.send("update blog success.");

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    },
    async deleteBlog(req, res) {

        try {

            const blog = await Blog.findOneAndDelete({ _id: req.params.id });

            //deleting all blog comments
            await Comment.deleteMany({ ofBlog: blog._id });

            // Delete pic from cloud
            if (blog.photoId.length) {
                await cloudinary.uploader.destroy(blog.photoId);
            }

            res.send("deletion successful");

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async getBlog(req, res) {

        try {
            const blog = await Blog.findById(req.params.id)
                .populate("blogBy", "userName");

            blog.views++;

            await blog.save({ validateBeforeSave: false });

            res.send(blog);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);

        }

    },
    async getAllBlogs(req, res) {

        try {
            let blogs = await Blog.find()
                .populate("blogBy", "userName")
                .sort({ createdAt: -1 });

            if (req.query.category) {
                blogs = blogs.filter(b => b.categories.includes(req.query.category));
            }

            if (req.query.keyword) {
                blogs = blogs.filter(b => b.title.includes(req.query.keyword) ||
                    b.body.includes(req.query.keyword));
            }

            res.send(blogs);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    },
    async getUserBlogs(req, res) {

        try {

            const blogs = await Blog.find({ blogBy: req.user._id })
                .populate("blogBy", "userName")
                .sort({ createdAt: -1 });

            res.send(blogs);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    }

}