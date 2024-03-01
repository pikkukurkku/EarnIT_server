const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizInputsSchema = new Schema({
  goals: [{ type: String, required: true }],
  careerPathOptions: [{ type: String, required: true }],
  countries: [{ type: String, required: true }],
  cities: [{ type: String, required: true }],
});

module.exports = model("QuizInputs", quizInputsSchema);

