const Quote = require('../../models/QuoteSchema'),
    serverInfo = require('../../utils/constants')
const axios = require("axios");

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

exports.getAllQuotesFromDb = async (req, res, next) => {
    try {
        const result = await axios.get(process.env.FREE_QUOTES_API);
        const quotesInDB = await Quote.find();
        req.dbQuotes = [...quotesInDB, ...result.data]
        next()
    } catch (err) {
        console.log(err)
        next()
    }
}