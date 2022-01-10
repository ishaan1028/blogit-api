
const route = require("express").Router();
const blogServices = require("../services/blog.service");
const isAuthenticated = require("../middlewares/verifyJWT");

// create blog
route.post("/create", isAuthenticated, blogServices.createBlog);

// update blog
route.put("/update/:id", isAuthenticated, blogServices.updateBlog);

// get a particular blog and update views
route.put("/get/:id", blogServices.getBlog);

//get all blogs
route.get("/all", blogServices.getAllBlogs);

//get all blogs of a user
route.get("/own", isAuthenticated, blogServices.getUserBlogs);

// delete blog
route.delete("/delete/:id", isAuthenticated, blogServices.deleteBlog);

module.exports = route;