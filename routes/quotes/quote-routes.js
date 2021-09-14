const router = require('express').Router(),
    {
        getAllQuotes,
        getQuoteById,
        postAddNewQuote,
        putUpdateQuoteById,
        deleteQuoteById
    } = require('../../controllers/quotes/quote-controllers');
const {auth} = require('../../middleware/auth');
const {findUserQuote, getAllQuotesFromDb} = require("../../middleware/quote");

router
    .route('/')
    .get(getAllQuotesFromDb, getAllQuotes)
    .post(auth, postAddNewQuote)
;

router
    .route('/:quoteId')
    .get(getAllQuotesFromDb, getQuoteById)
    .put(auth, findUserQuote, putUpdateQuoteById)
    .delete(auth, findUserQuote, deleteQuoteById);

module.exports = router;