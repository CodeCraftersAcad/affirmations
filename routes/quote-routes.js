const router = require('express').Router(),
    {getAllQuotes} = require('../controllers/quote-controllers');

router
    .route('/')
    .get(getAllQuotes);

module.exports = router;