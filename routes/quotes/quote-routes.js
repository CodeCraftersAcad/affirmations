const router = require('express').Router(),
    {getAllQuotes, getQuoteById, postAddNewQuote, putUpdateQuoteById, deleteQuoteById} = require('../../controllers/quotes/quote-controllers');

router
    .route('/')
    .get(getAllQuotes)
    .post(postAddNewQuote);

router
    .route('/:quoteId')
    .get(getQuoteById)
    .put(putUpdateQuoteById)
    .delete(deleteQuoteById);

module.exports = router;