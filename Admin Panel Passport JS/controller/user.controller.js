const userSchema = require("../models/user.models")
const fs = require("fs");
const path = require("path")

exports.addUserPageRender = async (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.redirect("/");
        } else {
            let user = await userSchema.findById(req.cookies.admin._id);
            return res.render("addusers", { user });
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};


exports.addUserPost = async (req, res) => {
    try {
        let userImg = req.file ? "/uploads/User-Images/" + req.file.filename : "";
        await userSchema.create({ ...req.body, image: userImg });
        console.log("Create Successfully");
        res.redirect('/users/viewallusers');
    } catch (error) {
        console.log("error", error);
    }
}

exports.viewAllUsers = async (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.redirect("/");
        } else {
            let user = await userSchema.findById(req.cookies.admin._id);
            let users = await userSchema.find();

            return res.render("viewallusers", { users, user });
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};


exports.editUserPageRender = async (req, res) => {
    try {
        if (!req.cookies.admin || !req.cookies.admin._id) {
            return res.redirect("/");
        }

        let admin = await userSchema.findById(req.cookies.admin._id);

        let userToEdit = await userSchema.findById(req.params.id);

        if (!userToEdit) {
            return res.redirect("/users/viewallusers");
        }

        return res.render("editusers", { user: admin, editUser: userToEdit });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.editUserPost = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await userSchema.findById(id);
        if (!doc) return res.redirect("back");

        let userpath = doc.image;
        if (req.file) {
            if (doc.image) {
                const oldPath = path.join(__dirname, "..", doc.image);
                try { fs.unlinkSync(oldPath); } catch (e) { }
            }
            userpath = `/uploads/User-Images/${req.file.filename}`;
        }

        await userSchema.findByIdAndUpdate(
            id,
            { ...req.body, image: userpath },
            { new: true }
        );

        console.log("Update Successfully");
        return res.redirect('/users/viewallusers');
    } catch (err) {
        console.error(err);
        return res.redirect("back");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userstore = await userSchema.findById(id);
        if (userstore) {
            if (userstore.image) {
                const filePath = path.join(__dirname, '..', userstore.image);
                try { fs.unlinkSync(filePath); } catch (e) { }
            }
            await userSchema.findByIdAndDelete(id);
            console.log("User Deleted Successfully");
        }
        return res.redirect("/users/viewallusers")
    } catch (error) {
        console.log("error", error);
        return res.redirect("/users/viewallusers");
    }
};
