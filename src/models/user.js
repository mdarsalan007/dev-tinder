const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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

userSchema.methods.getJWT = async function(){
  const user = this;

  const token =  jwt.sign({_id:user._id},"DevTinder$790",{expiresIn:"7d"});

  return token;
}

userSchema.methods.validatePassword = async function(PasswordInputByUser){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(PasswordInputByUser, passwordHash);

  return isPasswordValid;

}
module.exports = mongoose.model("User", userSchema);
