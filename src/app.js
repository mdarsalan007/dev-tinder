const express = require("express");
const app = express();
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// below should work for all the routes automatically.
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    } else {
      res.send("successfully loged-in");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(400).send("something wnet wrong!");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: "arsalan@dummy.com" });
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong!");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body.id;
    await User.findByIdAndDelete(id);
    res.send("deleted user of matching id successfully");
  } catch {
    res.status(400).send("something went wrong while deleting the user");
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params?.id;
  const data = req.body;

  try {
    const allowedUpadtes = ["photoUrl", "about", "skills", "password"];
    const isAllowed = Object.keys(data).every((k) =>
      allowedUpadtes.includes(k)
    );
    if (!isAllowed) {
      throw new Error("You cannot update user identity details after signup");
    }
    await User.findByIdAndUpdate(id, data, { runValidators: true });
    res.send("data updated successfully");
  } catch (err) {
    res.status(400).send("Update failed" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connected to the database successfully");

    app.listen(3000, () => {
      console.log("server is successfully listening on port:3000");
    });
  })
  .catch((err) => {
    console.error("database is not connected");
  });
