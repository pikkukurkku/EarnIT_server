const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const QuizInput = require("../models/QuizInput.model");
const mongoose = require('mongoose');


const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();
const saltRounds = 10;


router.post('/signup/:quizinputId', (req, res, next) => {
  const { name, email, password} = req.body;
  const { quizinputId } = req.params;

  if (name === '' || email === '' || password === '' ) {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

    User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ name, email, password: hashedPassword, quizInputId: quizinputId });
    })
    .then((createdUser) => {
      return QuizInput.findByIdAndUpdate(quizinputId, { user: createdUser._id })
        .then(() => createdUser);
    }).then((createdUser) => {
      res.status(201).json({ user: createdUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});


router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
    
      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const payload = { _id, email, name };

        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Wrong password, try again" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});


router.get('/verify', isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});


router.delete('/user', isAuthenticated, (req, res, next) => {
  const userId = req.payload._id; 

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndDelete(userId)
  .then((deletedUser) => {
    if (deletedUser) {
      QuizInput.findOneAndDelete({ user: userId })
        .then((deletedQuizInput) => {
          if (deletedQuizInput) {
            res.json({ message: `User with ${userId} and associated quiz input are removed successfully.` });
          } else {
            res.status(404).json({ message: "User removed, but associated quiz input not found." });
          }
        })
        .catch((quizInputError) => {
          console.error(quizInputError);
          res.status(500).json({ message: "Error deleting associated quiz input" });
        });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  })
  .catch((userError) => {
    console.error(userError);
    res.status(500).json({ message: "Error deleting user" });
  });
});

module.exports = router;