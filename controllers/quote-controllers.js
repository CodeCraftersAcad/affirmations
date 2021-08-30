const axios = require('axios'),
    Quote = require('../models/QuoteSchema'),
    pageInfo = require('../utils/constatns');

exports.getAllQuotes = async (req, res) => {
    try {
        const result = await axios.get('https://type.fit/api/quotes');
        const quotesInDB = await Quote.find();
        return res
            .status(200)
            .json({
                msg: pageInfo.quotes.QUOTES_FOUND,
                quotes: [...quotesInDB,...result.data]
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                msg: pageInfo.error.SOMETHING_WENT_WRONG
            })
    }
}

exports.postAddNewQuote = async (req, res) => {
    const {author, text, category} = req.body;
    try {
        const existingQuote = await Quote.find({ "text": { $regex: text, $options: "ig" } });
        if (existingQuote.length === 0) {   
            const newQuote = await Quote.create({
                author: author || "Unknown",
                text: text,
                category
            });
            return res.status(201).json({msg: pageInfo.quotes.QUOTE_CREATED, newQuote});
        } else {
            return res.status(500).json({ msg: pageInfo.quotes.QUOTE_EXISTS, existingQuote });
        }
    } catch (err) {
        console.log(err);
    }

}

exports.getQuoteById = async (req, res) => {
    const {quoteId} = req.params;
    try {
        const quote = await Quote.findOne({_id: quoteId});
        if (!quote) return res.status(404).json({msg: pageInfo.quotes.QUOTE_NOT_FOUND});
        else return res.status(200).json({msg: pageInfo.quotes.QUOTES_FOUND, quote});
    } catch (err) {
        console.log(err);
    }
}

exports.putUpdateQuoteById = async (req, res) => {
    try {
        const {quoteId} = req.params;
        const {author, text, category, visibility} = req.body;
        const updatedQuote = await Quote.findOneAndUpdate(
            {_id: quoteId},
            {author, text, category, visibility},
            {returnOriginal: false}
        );
        return res.status(201).json({msg: pageInfo.quotes.QUOTE_UPDATED, updatedQuote});
    } catch (err) {
        console.log(err)
    }
}

exports.deleteQuoteById = async (req, res) => {
    const {quoteId} = req.params;
    try {
        await Quote.findByIdAndDelete(quoteId);
        return res.status(200).json({msg: pageInfo.quotes.QUOTE_DELETED});
    } catch (err) {
        console.log(err);
    }
}