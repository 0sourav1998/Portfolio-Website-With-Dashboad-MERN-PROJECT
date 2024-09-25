const mongoose = require("mongoose");

const skillController = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    required: true,
  },
  skillImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Skill", skillController);
