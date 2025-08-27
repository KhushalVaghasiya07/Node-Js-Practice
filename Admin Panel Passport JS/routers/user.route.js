const express = require("express");
const { addUserPageRender, viewAllUsers, addUserPost, deleteUser, editUserPageRender, editUserPost } = require("../controller/user.controller");
const usersRouter = express.Router();
const userImage = require("../middleware/userImages.middleware")

usersRouter.get("/addusers", addUserPageRender);
usersRouter.post("/addusers", userImage.single("image"), addUserPost);
usersRouter.get("/viewAllusers", viewAllUsers);
usersRouter.get("/editUser/:id", editUserPageRender);
usersRouter.post("/editUser/:id", userImage.single("image"), editUserPost);
usersRouter.get("/deleteUser/:id", deleteUser);

module.exports = usersRouter;