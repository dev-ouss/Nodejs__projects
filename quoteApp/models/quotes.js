const Joi = require("joi");
const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  body: { type: String, minlength: 5, maxlength: 500, required: true },
  author: { type: String, minlength: 5, maxlength: 255, required: true },
  category: {
    type: String,
    minlength: 5,
    maxlength: 255,
    enum: [
      "business",
      "psychology",
      "philosophy",
      "art",
      "science",
      "politics",
    ],
    required: true,
  },
  date: { type: Date, default: new Date() },
});

const Quote = mongoose.model("Quote", quoteSchema);

function validateQuote(quote) {
  const schema = Joi.object({
    body: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
  });

  return schema.validate(quote);
}

exports.Quote = Quote;
exports.validate = validateQuote;
