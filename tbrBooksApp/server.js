require("express-async-errors");
const express = require("express");
const app = express();
const users = require("./router/users");
const lists = require("./router/lists");
const auth = require("./router/auth");
const error = require("./middleware/error");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tbr");

app.use(express.json());
app.use("/tbr.com/api/users", users);
app.use("/tbr.com/api/lists", lists);
app.use("/tbr.com/api/auth", auth);
app.use(error);

app.listen(8000);
