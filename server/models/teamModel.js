const mongoose = require('mongoose')

const TeamShcema = new mongoose.Schema({
  tag1: {
    type: String,
  },
  tag2: {
    type: String,
  },
  tag3: {
    type: String,
  },
  tag4: {
    type: String,
  },
  tag5: {
    type: String,
  },
  tag6: {
    type: String,
  },
  tag7: {
    type: String,
  },
  tag8: {
    type: String,
  },
  competencies: {
    type: [String],
  },
  links: {
    type: String,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', TeamShcema) 