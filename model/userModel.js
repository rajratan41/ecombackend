const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
    maxLength: [50, "Name must be less than 50 Character"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validator: [validator.isEmail, "Please Enter Email in Correct Format"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [6, "Password must be atleast 6 character"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before save to Database - using HOOKS (pre, post)
userSchema.pre("save", async function (next) {
  // if password is not modified by user
  if (!this.isModified("password")) {
    return next();
  }

  //  if password is modified by user
  this.password = await bcrypt.hash(this.password, 10);
});

// Validate password with user's sent password
userSchema.methods.isValidatedPassword = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
