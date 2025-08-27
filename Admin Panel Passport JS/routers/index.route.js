const express = require("express");
const { dashboard, logOut, loginGet, loginPost, forgetPassword, sendEmail, verifyOTP, resetPassword, updatedPasswordGet, updatedPasswordPost } = require("../controller/dashboard.controller");
const usersRouter = require("./user.route");
const blogroute = require("./blog.route");
const router = express.Router();

router.get("/", loginGet);
router.post("/loginUser", loginPost);
router.get("/logOut", logOut);
router.get("/dashboard", dashboard);
router.get("/forget-password", forgetPassword);
router.post("/send-email", sendEmail);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/updated-Password", updatedPasswordGet);
router.post("/update-Password", updatedPasswordPost);

router.use("/users", usersRouter);
router.use("/blog", blogroute);

module.exports = router;