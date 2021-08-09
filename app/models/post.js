const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    number: {
        type: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
