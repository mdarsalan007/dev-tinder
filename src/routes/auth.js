const express = require("express");
const authRouter = express.Router();
const{validateSignUpData} = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
  // dynamic to recieve data from end user (here postman)

  try {
    // validate signup data
    validateSignUpData(req);
    // encryption of password
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    } else {

      const token = await user.getJWT();
 
      res.cookie("token",token,{maxAge:3600000*24*7})
      res.send("successfully loged-in");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req,res)=>{
    res.cookie("token", null, {maxAge:0})
    res.send("LogOut successfully!");
})

module.exports = authRouter;