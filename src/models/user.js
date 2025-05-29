const mongoose = require("mongoose");
const imageExtensionRegex = /\.(jpg|jpeg|png)$/i;
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      
    },
    age: {
      type: Number,
      min: 18,
      max: 150,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "123.png",
      maxlength: 500,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL."+value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about for a user",
      maxLength: 200,
    },
    skills: {
      type: [String],
      validate(v) {
        if (v.length > 15) {
          throw new Error("Maximum you can add 15 skills.");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
