const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validation = require("../middleware/validation");
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  //data verification
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}
module.exports = router;
