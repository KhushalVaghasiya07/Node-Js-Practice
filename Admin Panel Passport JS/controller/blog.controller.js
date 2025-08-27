const blogModel = require("../models/blog.models");
const userSchema = require("../models/user.models");
const fs = require("fs");
const path = require("path");

exports.myblog = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/");
        }

        let user = await userSchema.findById(req.cookies.admin._id);
        if (!user) return res.redirect("/");

        let blogs = await blogModel.find({ authorid: user._id });
        return res.render("myblog", { user, blogs });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.Addblog = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/");
        }

        let user = await userSchema.findById(req.cookies.admin._id);
        return res.render("Addblog", { user, authImg: user.image });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.viewallblog = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/");
        }

        let user = await userSchema.findById(req.cookies.admin._id);
        let filter = {};
        let category = req.query.category || "";

        if (category !== "") filter.category = category;

        let blogs = await blogModel.find(filter);
        return res.render("viewallblog", { user, blogs, category });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.addBlog = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/");
        }

        let user = await userSchema.findById(req.cookies.admin._id);

        // 🟢 fixed path to always store inside Blogs-Images folder
        let blogImg = req.file ? "/uploads/Blogs-Images/" + req.file.filename : "";

        const newBlog = new blogModel({
            ...req.body,
            authname: user.firstname + " " + user.lastname,
            authImg: user.image,
            blogImg: blogImg,
            authorid: user._id,
        });

        await newBlog.save();

        return res.redirect("/blog/viewallblog");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.editblog = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/");
        }

        let user = await userSchema.findById(req.cookies.admin._id);
        let id = req.params.id;
        let blog = await blogModel.findById(id);

        return res.render("editblog", { user, blog });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.editBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await blogModel.findById(id);
        if (!blog) return res.redirect("back");

        let blogpath = blog.blogImg;

        if (req.file) {
            // 🟢 fixed path delete issue (blog.blogImg already starts with /uploads)
            let oldPath = path.join(__dirname, "..", blog.blogImg);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            // 🟢 fixed new image save path
            blogpath = "/uploads/Blogs-Images/" + req.file.filename;
        }

        let user = await userSchema.findById(req.cookies.admin._id);

        await blogModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
                blogImg: blogpath,
                authImg: user.image,
                authname: user.firstname + " " + user.lastname,
            },
            { new: true }
        );

        console.log("Blog Updated Successfully");
        res.redirect("/blog/myblog");
    } catch (err) {
        console.error(err);
        res.redirect("back");
    }
};

exports.blogdelete = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await blogModel.findById(id);

        if (blog.blogImg) {
            // 🟢 fixed path delete issue
            let blogpath = path.join(__dirname, "..", blog.blogImg);
            if (fs.existsSync(blogpath)) {
                fs.unlinkSync(blogpath);
            }
        }

        await blogModel.findByIdAndDelete(id);
        console.log("Blog Deleted Successfully");
        res.redirect("/blog/myblog");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.singleblogview = async (req, res) => {
    try {
        let id = req.params.id;
        let blogs = await blogModel.findById(id);
        let user = await userSchema.findById(req.cookies.admin._id);

        let latestBlogs = await blogModel.find({ _id: { $ne: id } })
            .sort({ createdAt: -1 })
            .limit(3);

        res.render("singleblogview", { user, blogs, latestBlogs });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};