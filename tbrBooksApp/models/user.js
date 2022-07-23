const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minLength: 10,
    maxLength: 50,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 1024,
    required: true,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(10).max(50).required(),
    password: Joi.string().min(6).max(1024),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validateUser = validateUser;
