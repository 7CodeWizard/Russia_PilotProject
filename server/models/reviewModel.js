const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    file: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    displayType: {
        type: [String],
    },
    queue: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
}
);

const Custom = mongoose.model("Review", reviewSchema);

module.exports = Custom;