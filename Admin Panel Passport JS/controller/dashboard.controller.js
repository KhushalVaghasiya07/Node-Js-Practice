const User = require("../models/user.models")
const otpgenerator = require("otp-generator");
const sendEmail = require("../middleware/mailMessanger.middleware");
const { findByIdAndUpdate } = require("../models/blog.models");

exports.dashboard = async (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.redirect("/");
        } else {
            let user = await User.findById(req.cookies.admin._id);
            console.log(user);

            return res.render("dashboard", { user });
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.loginGet = (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.render("login");
        } else {
            return res.redirect("/dashboard");
        }
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
};


exports.loginPost = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.password == req.body.password) {
                res.cookie("admin", user);
                return res.redirect("/dashboard", { user });
            } else {
                console.log("user credential worng");
                res.redirect("/");
            }
        }
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
}

exports.logOut = async (req, res) => {
    try {
        res.clearCookie("admin");
        return res.redirect("/");
    } catch (error) {
        console.log("error", error);
        res.redirect("/dashboard");
    }
}

exports.forgetPassword = (req, res) => {
    try {
        return res.render("forgetPassword");
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
};

exports.sendEmail = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
            return res.redirect("/");
        }

        let otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let mailMessage = {
            from: 'khushalvaghasiya0@gmail.com',
            to: `${req.body.email}`,
            subject: "Reset Password for Admin Panel",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email Template</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            width: 100%;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }

        .email-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .email-header p {
            font-size: 16px;
            opacity: 0.9;
        }

        .email-body {
            padding: 30px;
        }

        .greeting {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }

        .message {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .otp-container {
            text-align: center;
            margin: 30px 0;
        }

        .otp-code {
            display: inline-block;
            background: #f3f4f6;
            padding: 15px 30px;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #4f46e5;
            border-radius: 8px;
            border: 2px dashed #4f46e5;
        }

        .validity {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 4px;
            margin: 25px 0;
            color: #92400e;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            color: #9ca3af;
            font-size: 14px;
        }

        .button {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 15px;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }

        @media (max-width: 600px) {
            .email-body {
                padding: 20px;
            }

            .otp-code {
                font-size: 24px;
                padding: 12px 20px;
                letter-spacing: 6px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="logo">AdminPanel</div>
            <h1>Password Reset Request</h1>
            <p>Secure access to your account</p>
        </div>

        <div class="email-body">
            <p class="greeting">Hello ${user.firstname},</p>

            <p class="message">We received a request to reset your password for your Admin Panel account. Use the One-Time Password (OTP) below to complete the process.</p>

            <div class="otp-container">
                <div class="otp-code">${otp}</div>
            </div>

            <div class="validity">
                <p><strong>Important:</strong> This OTP is valid for the next 5 minutes only. Please do not share this code with anyone.</p>
            </div>

            <p class="message">If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</p>

            <p class="footer">
                Need help? Contact our support team<br>
                © 2023 AdminPanel. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `,
        }

        sendEmail(mailMessage);
        res.cookie('otp', otp);
        res.cookie('email', user.email);
        return res.render('otp-page');
    } catch (error) {
        console.log("something Wrong");
        return res.redirect("/");
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        let otp = req.cookies.otp;
        if (otp == req.body.otp) {
            res.clearCookie("otp");
            return res.render("newPassword");
        } else {
            console.log("OTP is Not Verified!!!!");
            return res.redirect("back")
        }
    } catch (error) {
        console.log("something Wrong");
        return res.redirect("/");
    }
};

exports.resetPassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        let user = await User.findOne({ email: email });
        if (user) {
            if (req.body.cpassword == req.body.newpassword) {
                await User.findByIdAndUpdate(user._id, { password: req.body.newpassword }, { new: true });
                res.clearCookie("email");
                return res.redirect("/");
            } else {
                console.log("Password is not matched");
                return res.redirect("back");
            }
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log("something Wrong",error);
        return res.redirect("/");
    }
}

exports.updatedPasswordGet = async (req, res) => {
    try {
        let user = User.findById(req.cookies.admin._id)
        res.render("updatedPassword",{user})
    } catch (error) {
        console.log("something Wrong",error);
        return res.redirect("/");
    }
}

exports.updatedPasswordPost = async (req, res) => {
    try {
        let user = await User.findById(req.cookies.admin._id);

        if (!user) {
            return res.redirect("/");
        }

        if (user.password !== req.body.oldpass) {
            console.log("Your Old Password is incorrect");
            return res.redirect("/updated-Password");
        }

        if (req.body.newpass !== req.body.confirmpass) {
            console.log("Your Updated Passwords do not match");
            return res.redirect("/updated-Password");
        }

        await User.findByIdAndUpdate(user._id, {
            password: req.body.newpass
        });

        console.log("Password updated successfully");
        return res.redirect("/");

    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect("/");
    }
};
