const route = require("express").Router();
const commentServices = require("../services/comment.service");
const isAuthenticated = require("../middlewares/verifyJWT");

//create a comment
route.post("/create", isAuthenticated, commentServices.addComment);

//get comments of a post
route.get("/ofblog/:id", commentServices.getComments);

//delete a comment
route.delete("/delete/:commentId", isAuthenticated, commentServices.deleteComment);

module.exports = route;