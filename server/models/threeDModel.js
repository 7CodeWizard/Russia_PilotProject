const mongoose = require('mongoose')

const ThreeSchema = new mongoose.Schema({
    title1: {
        type: String,
    },
    content1: {
        type: String,
    },
    title2: {
        type: String,
    },
    content2: {
        type: String,
    },
    video: {
        type: String
    },
    links: {
        type: String
    },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Three', ThreeSchema)