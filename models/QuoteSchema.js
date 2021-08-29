const mongoose = require('mongoose');

const QouteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: "Author name required"
    },
    text: {
        type: String,
        required: "Quote text required"
    },
    category: {
        type: String
    },
    likes: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("Quote", QouteSchema);