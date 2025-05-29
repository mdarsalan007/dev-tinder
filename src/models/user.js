const mongoose = require("mongoose");
const imageExtensionRegex = /\.(jpg|jpeg|png)$/i;


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength:26
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength:26
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength:50
    },
    password: {
      type: String,
      required: true,
      minLength:8,
      maxLength:30
    },
    age: {
      type: Number,
      min: 18,
      max:150
    },
    gender: {
      type: String,
      // how to add a custom validation function (but by default it will only be called in signup not in path[means updating ] for that u have to pass an opton runValidators in patch)
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1k4G5-S8HdbqcAokpwZBfwUQKFhodPBt1_8Xv78Q0Pm805bBRyJVfCaI&s",
        maxlength: 500,
        validate: function(v) {
            if(!imageExtensionRegex.test(v)){
                throw new Error("only jpg, png and jpeg file type allowed")
            };
        }


    },
    about: {
      type: String,
      default: "This is default about for a user",
      maxLength:200
    },
    skills: {
      type: [String],
      validate(v){
        if(v.length > 15){
            throw new Error("Maximum you can add 15 skills.")
        }
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
