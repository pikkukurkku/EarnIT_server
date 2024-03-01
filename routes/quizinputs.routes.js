const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QuizInputs = require("../models/QuizInputs.model");


router.post("/quizinput", (req, res, next) => {
  const { goals, careerPathOptions, countries, cities } = req.body;

  if (!goals || !careerPathOptions || !countries || !cities) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  QuizInputs.create({ goals, careerPathOptions, countries, cities })
  console.log("something is happening")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


module.exports = router;
