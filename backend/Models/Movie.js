const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    trailer: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    reviews: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Review'},
    ]
});

movieSchema.path('reviews').default([]);
module.exports = mongoose.model('Movie', movieSchema);
