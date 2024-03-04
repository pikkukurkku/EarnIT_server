
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quiz4Schema = new Schema({
  degree: {type: String, required: true },
  subjects: {type:[String], required: true }, 
  courses: {type:[String], required: true },
  languages: {type:[String], required: true },
  softSkills: {type:[String], required: true },
  hardSkills: {type:[String], required: true },
  quizInput: { type: Schema.Types.ObjectId, ref: "QuizInput" }
});


module.exports = model("Quiz4", quiz4Schema);