const mongoose = require('mongoose')

const SolutionSchema = new mongoose.Schema({
    content: { type: String },
    images: [{
        title: { type: String },
        image: { type: String }
    }]
});

const SiteSchema = new mongoose.Schema({
    photo: String,
    capacity: String,
    address: String,
    link_page: String
})

const CaseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    guests: {
        type: String,
    },
    venue: {
        type: String,
    },
    video: {
        type: String,
    },
    images: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    checkbox: {
        type: [String],
        default: []
    },
    cities: {
        type: [String],
        default: []
    },
    features: {
        type: String
    },
    queue: {
        type: Number,
        default: 0
    },
    solution: {
        type: [SolutionSchema],
        default: []
    },
    d_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Three' },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    equipment: { type: [mongoose.Schema.Types.ObjectId], ref: 'Equipment' },
    checked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Case', CaseSchema)