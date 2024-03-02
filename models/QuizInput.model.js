const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizInputSchema = new Schema({
  goals: { type: [String], required: true },
  careerPathOptions: { type: [String], required: true },
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
});


module.exports = model("QuizInput", quizInputSchema);
