const User = require("../model/userModel");
const BigPromise = require("../middleware/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

exports.signup = BigPromise(async (req, res, next) => {
  // checking file is coming from user or not
  if (!req.files) {
    return next(new CustomError("Photo is Required for Signup", 400));
  }

  //    taking name, email, password from body
  const { name, email, password } = req.body;

  //   checking name, email, password is entered or not
  if (!name || !email || !password) {
    return next(new CustomError("Name, Email and Password are Required", 400));
  }

  // upload file to cloudinary
  let file = req.files.photo;

  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
    width: 150,
    crop: "scale",
  });

  //   all good then create user in Database
  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  //   calling Cookie Token
  cookieToken(user, res);
});
