const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: [true, "An email must be unique"],
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
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ****************************************************************
//* Encrypt password
userSchema.pre("save", async function (next) {
  //only run this if password was modified
  if (!this.isModified("password")) return next(); //this 'isModified' is a mongoose method

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete password confirm field
  this.confirmPassword = undefined;

  next();
});
// ********************************************************
userSchema.methods.checkPassword = async function (
  requestedPassword,
  passwordInDatabase
) {
  return await bcrypt.compare(requestedPassword, passwordInDatabase);
};

// ****************************************************************

//* check if password is changed after receiving jwt token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// ****************************************************************

//forgot password
userSchema.methods.createPasswordResetToken = function () {
  //1)Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");
  //2)Hash token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 1000 * 60 * 10;

  return resetToken;
};
// ****************************************************************

//reset password
userSchema.pre("save", function (next) {
  //only run this function if password was actually modified
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
