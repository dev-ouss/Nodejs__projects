const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Quote, validate } = require("../models/quotes");

router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort("-date");
    res.send(quotes);
  } catch (err) {
    console.log("Error", err);
  }
});

router.get("/:category", async (req, res) => {
  try {
    const quotes = await Quote.find({
      category: req.params.category,
    }).sort("-date");
    res.send(quotes);
  } catch (err) {
    console.log("Error", err);
  }
});

router.post("/", async (req, res) => {
  // data verification
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const quote = new Quote({
    body: req.body.body,
    author: req.body.author,
    category: req.body.category,
  });
  try {
    await quote.save();
    res.send(quote);
  } catch (err) {
    console.log("Error", err);
  }
});

exports = router;
