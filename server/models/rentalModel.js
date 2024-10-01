const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  cost: {
    type: String,
    require: true
  },
  files: {
    type: [String],
  },

}, {
  timestamps: true
}
);

module.exports = mongoose.model("Rental", rentalSchema);
