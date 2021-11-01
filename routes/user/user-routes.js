const router = require('express').Router(),
    { getQuotesByUserId } = require('../../controllers/user/user-controllers');

router
    .route('/:userId')
    .get(getQuotesByUserId);

module.exports = router;