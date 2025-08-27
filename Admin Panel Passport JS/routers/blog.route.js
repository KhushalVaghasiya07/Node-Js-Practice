const express = require("express");
const { Addblog, viewallblog, addBlog, myblog, blogdelete, editblog, editBlog, singleblogview } = require("../controller/blog.controller");
const blogroute = express.Router();
const blogsImg = require("../middleware/blogsImages.middleware")

blogroute.get("/Addblog", Addblog);
blogroute.post("/Addblog", blogsImg.single("blogImg"), addBlog);
blogroute.get("/viewAllblog", viewallblog);
blogroute.get("/myblog", myblog);
blogroute.get("/editblog/:id", editblog);
blogroute.post("/editblog/:id", blogsImg.single("blogImg"), editBlog);
blogroute.get("/blogdelete/:id", blogdelete);
blogroute.get("/singleblogview/:id", singleblogview);

module.exports = blogroute;