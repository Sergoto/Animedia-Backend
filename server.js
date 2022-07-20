require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('./db/connection');
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth")


app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});


app.use("/auth", authRoute)


const port = process.env.port || 4023;

app.listen(port, () => {
  console.log(`Animedia is running on ${port}`);
});