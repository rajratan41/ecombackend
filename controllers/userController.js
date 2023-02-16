const User = require("../model/userModel");
const BigPromise = require("../middleware/bigPromise");
const CustomError = require("../utils/customError");

exports.signup = BigPromise(async (req, res, next) => {
  // taking name, email, password from body
  const { name, email, password } = req.body;

  // checking name, email, password is entered or not
  if (!name || !email || !password) {
    return next(new CustomError("Name, Email and Password are Required", 400));
  }
});
