const router = require('express').Router(),
    {getAllNews} = require('../controllers/news-controllers');

router
    .route('/')
    .get(getAllNews);

module.exports = router;