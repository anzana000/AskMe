const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password field is required"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validator: function (el) {
      // this 'el' refers to confirmPassword field
      return el === this.password;
    },
    message: "Passwords don't match, please try again",
  },
});

userSchema.pre("save", async function (next) {
  //only run this if password was modified
  if (!this.isModified("password")) return next(); //this 'isModified' is a mongoose method

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete password confirm field
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.checkPassword = async function (
  requestedPassword,
  passwordInDatabase
) {
  return await bcrypt.compare(requestedPassword, passwordInDatabase);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
