require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// morgan middleware
app.use(morgan("tiny"));

// import all routes
const home = require("./routes/home");
const user = require("./routes/user");
// router middleware
app.use("/api/v1", user);
app.use("/api/v1", home);

module.exports = app;
