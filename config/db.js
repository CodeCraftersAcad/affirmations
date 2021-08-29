const mongoose = require('mongoose');

const connectDB = async (env) => {
    try {
        if (env === 'development') {
            const conn = mongoose.connect(
                process.env.MONGO_URL || 'mongodb://localhost:27017/affirmations', {
                    useCreateIndex: true,
                    useFindAndModify: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            console.log(`Development DB Connected: ${(await conn).connection.host}`)
        } else {
            const conn = mongoose.connect(
                process.env.MONGO_URL, {
                    useCreateIndex: true,
                    useFindAndModify: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            console.log(`Production DB Connected: ${(await conn).connection.host}`)
        }

    } catch (err) {
        console.log(err.message)
        console.log(err.code)
    }
}

module.exports = connectDB;