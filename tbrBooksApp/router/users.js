const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const users = await User.find({});

  return res.status(200).send(users);
});

router.get("/:email", async (req, res) => {
  const user = await User.findOne({
    email: req.params.email,
  });

  return res.status(200).send(user);
});

router.post("/", validation(validateUser), async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.generateAuthToken();

  await user.save();
  res.header("x-auth-token", token).send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
