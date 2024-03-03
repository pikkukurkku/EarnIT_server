
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quiz3Schema = new Schema({
    previousJobTitle: { type: String, required: true },
    workPeriod: {
      from: { type: Date, required: true },
      to: { type: Date, required: true }
    },
  quizInput: { type: Schema.Types.ObjectId, ref: "QuizInput" }
});


module.exports = model("Quiz3", quiz3Schema);