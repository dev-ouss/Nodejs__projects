const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const { List, validateList } = require("../models/list");

router.get("/", auth, async (req, res) => {
  const lists = await List.find({});

  return res.send(lists);
});

router.get("/:userId", auth, async (req, res) => {
  const list = await List.find({
    user: req.params.userId,
  }).select("-user");

  return res.send(list);
});

router.post("/", [auth, validation(validateList)], async (req, res) => {
  const list = new List({
    title: req.body.title,
    books: req.body.books,
    user: req.body.user,
  });

  await list.save();
  res.send(list);
});
router.put("/:id", [auth, validation(validateList)], async (req, res) => {
  const response = await List.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        books: req.body.books,
      },
    }
  );
  res.send(response);
});

module.exports = router;
