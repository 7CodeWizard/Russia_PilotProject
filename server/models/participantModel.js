const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Participant', ParticipantSchema)