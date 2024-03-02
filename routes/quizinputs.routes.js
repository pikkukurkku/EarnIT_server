const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QuizInput = require("../models/QuizInput.model");


router.post("/quizinput", (req, res, next) => {
  console.log("Received POST request:", req.method, req.url, req.body);
  const { goals, careerPathOptions, countries, cities } = req.body;

  if (!goals || !careerPathOptions || !countries || !cities) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  QuizInput.create({ goals, careerPathOptions, countries, cities })

  .then((response) => {
    console.log("something is happening", response);
    res.json(response);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });
});

router.get("/quizinput", (req, res, next) => {
  QuizInput.find()
    .then((allQuizInputs) => res.json(allQuizInputs))
    .catch((err) => res.json(err));
});


router.get("/quizinput/:quizinputId", (req, res, next) => {
  const { quizinputId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizinputId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  QuizInput.findById(quizinputId)
    .then((quizinput) => res.status(200).json(quizinput))
    .catch((error) => res.json(error));
});

router.put("/quizinput/:quizinputId", (req, res, next) => {
  const { quizinputId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizinputId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  QuizInput.findByIdAndUpdate(quizinputId, req.body, { new: true })
    .then((updatedQuizInput) => res.json(updatedQuizInput))
    .catch((error) => res.json(error));
});

router.delete("/quizinput/:quizinputId", (req, res, next) => {
  const { quizinputId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizinputId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  QuizInput.findByIdAndRemove(quizinputId)
    .then(() =>
      res.json({
        message: `Quiz input with ${quizinputId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});







module.exports = router;
