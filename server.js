require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8000;
const router = require("./Router/router");
const connectDB = require("./Utils/db");

app.use(express.json());
app.use("/user", router);

connectDB().then(
  app.listen(PORT, () => {
    console.log(`server running successful on http://localhost:${PORT}`);
  })
);
