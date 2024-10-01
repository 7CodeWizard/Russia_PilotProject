const mongoose = require('mongoose')

const FactorySchema = new mongoose.Schema({
    title: {
        type: String
    },
    video: {
        type: String
    },
    queue: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    links: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Factory', FactorySchema)