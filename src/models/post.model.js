const mongoose = require('mongoose');

const posrSchima = new mongoose.Schema({
    image: {
        type: String
    },
    caption: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    }
});

module.exports = mongoose.model('Post', posrSchima);