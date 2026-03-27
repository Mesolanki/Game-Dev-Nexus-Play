const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    mediaUrl: { type: String },
    mediaType: {
        type: String,
        enum: ['image', 'video', 'none'],
        default: 'none'
    },
    likes: { type: Number, default: 0 },
    comments: [{
        username: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);