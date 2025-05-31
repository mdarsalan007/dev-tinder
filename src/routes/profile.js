const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/UserAuth");
const { validateEditProfileData } = require("../utils/validation");
const user = require("../models/user");
const { isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Invalid edit request!");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/changepassword", userAuth, async (req, res) => {
  try {
    const newPassword = req.body.password;

    const user = req.user;
    const currentPassword = user.password;

    if (!isStrongPassword(newPassword)) {
      throw new Error("Please enter a strong password!");
    }

    const issamePassword = await bcrypt.compare(newPassword, currentPassword);
    if (issamePassword) {
      throw new Error("This password is already in use!");
    } else {
      const hashednewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashednewPassword;
      req.user.save();
      res.send("password changed");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
