const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const ResetPassword = require("../models/Reset-password");
const userController = require("../controllers/user.controller");
const crypto = require("crypto");
const { Op } = require("sequelize");
async function login(req, res, next) {
  try {
    let { email, password } = req.body;
    const user = await userController.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "invalid_email_password" });
    }

    if (!user.isEnabled) {
      return res.status(403).json({ message: "account_disabled" });
    }

    let isMatch = user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid_email_password" });
    }

    let permissionskey = [];
    for (const permission of user.Role.Permissions) {
      permissionskey.push(permission.key);
    }

    let jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.secretKey,
      { expiresIn: 86400 }
    );
    return res.status(200).json({
      token: jwtToken,
      expiresIn: 86400,
      permissions: permissionskey,
    });
  } catch (error) {
    res.status(500).json({ message: "an error occurred please try again!" });
  }
}

async function forgetPassword(req, res, next) {
  try {
    const email = req.body.email;
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "user_not_found" });
    }

    let resetPassword = await ResetPassword.create({
      token: crypto.randomBytes(16).toString("hex"),
      isExpired: false,
      UserId: user.id,
    });

    var selfSignedConfig = {
      host: "mail.beemail.tn",
      port: 25,
      secure: false,
      igonreTLS: true,
      auth: {
        user: process.env.email,
        pass: process.env.emailPassword,
      },
    };

    var transporter = nodemailer.createTransport(selfSignedConfig);

    let frontendUrl = process.env.frontendUrl;
    var mailOptions = {
      from: "smartradius@bee.net.tn", // sender
      to: email, // list of receivers (who receives)
      subject: "Reset password from Rh Bee", // Subject line
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        frontendUrl +
        "/reset-password/" +
        resetPassword.token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "email sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an error occurred!" });
  }
}

async function checkToken(req, res, next) {
  try {
    let token = req.body.token;
    let resetToken = await ResetPassword.findOne({
      where: { [Op.and]: [{ token: token }, { isExpired: false }] },
    });

    if (resetToken) {
      return res.status(200).json({ exist: true });
    } else {
      return res.status(404).json({ exist: false });
    }
  } catch (error) {
    res.status(500).json({ error: "an error occurred!" });
  }
}

async function resetPassword(req, res, next) {
  try {
    let token = req.params.token;
    let password = req.body.password;
    // verify token and after that chnage password
    let resetToken = await ResetPassword.findOne({
      where: { [Op.and]: [{ token: token }, { isExpired: false }] },
    });

    if (!resetToken) {
      return res.status(404).json({ message: "token_expired" });
    }

    let user = await User.findOne({ where: { id: resetToken.UserId } });
    user.password = password;
    resetToken.isExpired = true;
    await Promise.all([user.save(), resetToken.save()]);
    res.status(200).json({ message: "password updated" });
  } catch (error) {
    res.status(500).json({ message: "an error occurred please try again!" });
  }
}

module.exports = { login, forgetPassword, checkToken, resetPassword };
