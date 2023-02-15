const app = require("./app");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

module.exports = app;
