const express = require("express");
const app = express();
const mongoose = require("mongoose");
const quotes = require("./router/quotes");

mongoose
  .connect("mongodb://localhost/quoteApp")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error", err));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/quotesaver.com/api/quotes", quotes);
app.listen(8000);
