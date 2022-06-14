const express = require("express");
const app = express();
const mongoose = require("mongoose");
const quotes = require("./router/quotes");
mongoose
  .connect("mongodb://localhost/quoteApp")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error", err));

app.use(express.json());
app.use("quoteApp/api/quotes", quotes);
