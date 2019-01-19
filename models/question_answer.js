var mongoose = require('mongoose');

var Question = mongoose.model('Question', {
   quest_no:{
     type: Number,
     required: true,
  },
  ques: {
    type: String,
    required: true,
  },
  opt_a: {
    type: String,
      required: true,
  },
  opt_b: {
    type: String,
      required: true,
  },
  opt_c: {
    type: String,
      required: true,
  },
  opt_d: {
    type: String,
      required: true,
  }
});

var Answer = mongoose.model('Answer', {
  question: {
    type: Number,
    required: true,
  },
  answer: {
    type: String,
      required: true,
  }
});

module.exports = {
  Question,
  Answer
};
