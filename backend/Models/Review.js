const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Review', reviewSchema);