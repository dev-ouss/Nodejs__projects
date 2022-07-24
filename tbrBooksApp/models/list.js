const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  books: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const List = mongoose.model("List", listSchema);

function validateList(list) {
  const schema = Joi.object({
    title: Joi.string().required(),
    books: Joi.array().required(),
    user: Joi.objectId(),
  });

  return schema.validate(list);
}

exports.List = List;
exports.validateList = validateList;
