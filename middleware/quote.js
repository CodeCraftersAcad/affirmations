const Quote = require('../models/QuoteSchema'),
    serverInfo = require('../utils/constants');

exports.findUserQuote = async (req, res, next) => {
    try {
        const {quoteId} = req.params;
        let quote;
        if (req.user.isAdmin) quote = await Quote.findOne({_id: quoteId})
        else {
            quote = await Quote.findOne({
                $and: [
                    {_id: quoteId},
                    {creator: req.user._id}
                ]
            })
        }
        if (!quote) return res.status(400).json({msg: serverInfo.quotes.NOT_USER_QUOTE})
        res.quote = quote;
        next()
    } catch (err) {
        console.log(err)
        next()
    }
}

exports.getAllQuotesFromDb = async (req, res) => {
    try {
        const keyword = req.params.quoteId ? req.params.quoteId : {}

        let quotes = await Quote.find({...keyword});
        res.json(quotes)
    } catch (err) {
        console.log(err)
    }
}