const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizInputSchema = new Schema({
  goals: { type: [String], required: true },
  careerPathOptions: { type: [String], required: true },
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
  quiz2: { type: Schema.Types.ObjectId, ref: "Quiz2" },
  quiz3: { type: Schema.Types.ObjectId, ref: "Quiz3" },
  quiz4: { type: Schema.Types.ObjectId, ref: "Quiz4" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});


module.exports = model("QuizInput", quizInputSchema);

