const router = require('express').Router(),
    {getAllNews} = require('../../controllers/quotes/news-controllers');

router
    .route('/')
    .get(getAllNews);

module.exports = router;