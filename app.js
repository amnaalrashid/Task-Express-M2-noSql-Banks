let accounts = require("./accounts");
const express = require("express");
const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");
const connectDB = require("./database.js");
const PORT = process.env.PORT;
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
connectDB();
app.use("/accounts", accountsRoutes);

app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
