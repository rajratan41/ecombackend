require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

// morgan middleware
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Home");
});
module.exports = app;
