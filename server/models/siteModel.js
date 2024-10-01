const mongoose = require('mongoose')

const SitesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    capacity: {
        type: String
    },
    address: {
        type: String
    },
    link_page: {
        type: String
    },
    video: {
        type: String
    },
    queue: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Site', SitesSchema)