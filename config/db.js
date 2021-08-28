const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = mongoose.connect(
        'mongodb://localhost:27017/affirmations' || process.env.MONGO_URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    if (conn) console.log(`Development DB Connected: ${(await conn).connection.host}`)
    else console.log("NOT CONNECTED TO DB");
}

module.exports = connectDB;