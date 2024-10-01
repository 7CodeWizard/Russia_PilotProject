const mongoose = require('mongoose')

const EquipSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    categoryType: {
        type: String
    },
    brand: {
        type: String
    },
    description: {
        type: String
    },
    manufacturer: {
        type: String
    },
    weight: {
        type: String
    },
    series: {
        type: String
    },
    dimension: {
        width: Number,
        depth: Number,
        height: Number,
    },
    queue: {
        type: Number,
        default: 0
    },
    file: {
        type: String
    },
    images: {
        type: [String]
    },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Equipment', EquipSchema)