const mongoose = require('mongoose');

const DbErrorSchema = new mongoose.Schema({
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
    },
    errorName: {
        type: String,
        required: true,
        default: 'MongoError'
    },
    statusCode: {
        type: Number,
        required:true,
        default: 500
    },
    method: {
        type: String,
        required: false
    },
    dbGeneratedError: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('DBError', DbErrorSchema);