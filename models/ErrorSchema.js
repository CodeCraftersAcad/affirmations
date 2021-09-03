const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
    errorCode: {
        type: String,
        required: false,
    },
    errorMessage: {
        type: String,
        required: false,
    },
    errorRoute: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Error', ErrorSchema);