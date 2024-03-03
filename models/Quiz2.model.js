

  const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quiz2Schema = new Schema({
 jobTitle: {type: String, required: true },
  employmentStatus: {type: String, required: true },
  years: {type: Number, required: true },
  salary: {type:String, required: true }, 
  responsibilities: {type:[String], required: true },
  quizInput: { type: Schema.Types.ObjectId, ref: "QuizInput" }
});


module.exports = model("Quiz2", quiz2Schema);