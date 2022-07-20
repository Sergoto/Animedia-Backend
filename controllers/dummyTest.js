require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("./db/connection");
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const People = mongoose.model("People", PeopleSchema);

app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
  try {
    // get all people
    res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

app.put("/people/:id", async (req, res) => {
  try {
    // update people by ID
    res.json(await People.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
  try {
    // delete people by ID
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

const port = process.env.port || 4023;

app.listen(port, () => {
  console.log(`Animedia is running on ${port}`);
});
