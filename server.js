require('dotenv').config();
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3001,
    connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
    
app.listen(()=> console.log(`http://localhost:${PORT}`))