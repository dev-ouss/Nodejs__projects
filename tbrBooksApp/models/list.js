const mongoose = require("mongoose");
const Joi = require("joi");

const listSchema = new mongoose.Schema({
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
    books: Joi.array().required(),
  });

  return schema.validate(list);
}

exports.List = List;
exports.validateList = validateList;
