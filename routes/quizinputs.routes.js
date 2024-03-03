const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QuizInput = require("../models/QuizInput.model");
const Quiz2 = require('../models/Quiz2.model');
const Quiz3 = require('../models/Quiz3.model');


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
  .populate("quiz2")
    .then((quizinput) => res.status(200).json(quizinput))
    .catch((error) => res.json(error));
});

router.put("/quizinput/:quizinputId/quiz2", async (req, res, next) => {
  try {
    const { quizinputId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizinputId)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }

    const { jobTitle, employmentStatus, years, salary, responsibilities } = req.body;
    
    // Create a new Quiz2 instance
    const quiz2 = new Quiz2({
      jobTitle,
      employmentStatus,
      years,
      salary,
      responsibilities,
      quizInput: quizinputId 
    });

    // Save the new Quiz2 instance
    await quiz2.save();

    // Find the QuizInput by id and update the quiz2 field
    const updatedQuizInput = await QuizInput.findByIdAndUpdate(
      quizinputId,
      { $push: { quiz2: quiz2._id } }, // Assuming quiz2 is an array in QuizInput model
      { new: true }
    );

    res.json(updatedQuizInput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/quizinput/:quizinputId/quiz3", async (req, res, next) => {
  try {
    const { quizinputId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizinputId)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }

    const { previousJobTitle, workPeriod } = req.body;
    
    // Create a new Quiz3 instance
    const quiz3 = new Quiz3({
      previousJobTitle,
      workPeriod,
      quizInput: quizinputId 
    });

    // Save the new Quiz2 instance
    await quiz3.save();

    // Find the QuizInput by id and update the quiz2 field
    const updatedQuizInput = await QuizInput.findByIdAndUpdate(
      quizinputId,
      { $push: { quiz3: quiz3._id } }, // Assuming quiz2 is an array in QuizInput model
      { new: true }
    );

    res.json(updatedQuizInput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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
