const app = require("./app");
const PORT = process.env.PORT;
const connectToDB = require("./config/db");

// connecting to Database
connectToDB();

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

module.exports = app;
