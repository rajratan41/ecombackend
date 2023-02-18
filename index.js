const app = require("./app");
const PORT = process.env.PORT;
const connectToDB = require("./config/db");

// importing cloudinary to upload image
const cloudinary = require("cloudinary");

// connecting to Database
connectToDB();

// Cloudinary config goes here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}/api/v1`);
});

module.exports = app;
