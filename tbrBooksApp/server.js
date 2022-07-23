require("express-async-errors");
const express = require("express");
const app = express();
const users = require("./router/users");
const error = require("./middleware/error");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tbr");

app.use(express.json());
app.use("/tbr.com/api/users", users);
app.use(error);

app.listen(8000);
