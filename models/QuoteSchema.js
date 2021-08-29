const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [false, "Author name required"]
    },
    text: {
        type: String,
        required: [false, "Quote text required"]
    },
    category: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Quote", QuoteSchema);