const Comment = require("../models/comment.model");
const Blog = require("../models/blog.model");

module.exports = {
    async addComment(req, res) {

        const { comment, ofBlog } = req.body;

        try {
            const newComment = await Comment.create({
                comment,
                ofBlog,
                commentBy: req.user._id
            });

            await Blog.findOneAndUpdate({ _id: ofBlog }, { $push: { comments: newComment._id } });

            const response = await newComment.populate("commentBy", "userName");

            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Couldnt post comment");

        }

    },
    async deleteComment(req, res) {
        try {

            const comment = await Comment.findOneAndDelete({ _id: req.params.commentId });

            await Blog.findOneAndUpdate({ _id: comment.ofBlog },
                {
                    $pull: { comments: comment._id }
                }
            );

            res.send("Comment deleted successfully");
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Couldnt delete comment");

        }

    },
    async getComments(req, res) {
        try {

            const comments = await Comment.find({ ofBlog: req.params.id })
                .populate("commentBy", "userName");

            res.send(comments);

        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);

        }

    }
}
