const mongoose = require('mongoose');
const {logErrorToDb} = require("../utils/helpers/db-helpers");
const {dbErrorHandling} = require("../utils/error/db-errrors");

const connectDB = async () => {
    try {
        const conn = mongoose.connect(
            process.env.MONGO_URL || 'mongodb://localhost:27017/affirmations', {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log(`Development DB Connected: ${(await conn).connection.host}`)
    } catch (err) {
        let error = dbErrorHandling(err);
        if (error) {
            // Log error data to db
            await logErrorToDb(error, 'Connection to DB', 'connection')
        }
    }
}

module.exports = connectDB;