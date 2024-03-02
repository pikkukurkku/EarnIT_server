const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizInputSchema = new Schema({
  goals: { type: [String], required: true },
  careerPathOptions: { type: [String], required: true },
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
  jobTitle: {type: String, required: true },
  employmentStatus: {type: String, required: true },
  years: {type: Number, required: true },
  salary: {type:String, required: true }, 
  responsibilities: {type:[String], required: true }
});


module.exports = model("QuizInput", quizInputSchema);

