require('dotenv').config();

// dependencies
const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 3001,
    connectDB = require('./config/db');

// connect to DB
connectDB();

// route logging
app.use(morgan('dev'));

// express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// test route
app.get("/test", (req, res) => {
    return res.status(200).json({ msg: "SERVER WORKS" });
});

// use routes
app.use('/quotes', require('./routes/quotes/quote-routes'));
app.use('/news', require('./routes/quotes/news-routes'));
app.use('/auth', require('./routes/auth/auth-routes'));
app.use('/user', require('./routes/user/user-routes'));
// express port listener
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));