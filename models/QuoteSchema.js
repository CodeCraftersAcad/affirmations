const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        required: [false, "Author name required"]
    },
    text: {
        type: String,
        required: [false, "Quote text required"],
        unique: true,
    },
    category: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    visibility: {
        public: {
            type: Boolean,
            default: false
        },
        private: {
            type: Boolean,
            default: true
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("Quote", QuoteSchema);