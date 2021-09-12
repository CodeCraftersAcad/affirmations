require('dotenv').config();
const user = require('./mock-users');
const User = require('../models/UserSchema');
const Quotes = require('../models/QuoteSchema');
const connectDb = require('../config/db');
const axios = require("axios");

connectDb()

const importData = async () => {
    try {
        await User.deleteMany();
        console.log('User Collection Cleared')
        await Quotes.deleteMany();
        console.log('Quotes Collection Cleared')

        console.log('Importing mock users')
        await User.insertMany(user);
        console.log('Users Imported');

        console.log('Fetching quotes')
        const result = await axios.get(process.env.FREE_QUOTES_API);
        console.log('Importing quotes')
        await Quotes.insertMany(result.data)
        console.log('Quotes Imported');

        console.log('Data import completed')
        process.exit();
    } catch (e) {
        console.error(e.message)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Quotes.deleteMany();


        console.log('DB Cleared');
        process.exit();
    } catch (e) {
        console.error(e.message);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}