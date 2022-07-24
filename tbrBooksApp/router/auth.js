const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validation = require("../middleware/validation");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", validation(validateUser), async (req, res) => {
  // checking the email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Invalid email or password.");
  // checking the password
  const isValid = bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(404).send("Invalid email or password.");
  //generate the jwt
  const token = user.generateAuthToken();

  res.send({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token: token,
  });
});

module.exports = router;
