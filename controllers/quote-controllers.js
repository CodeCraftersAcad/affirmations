const axios = require('axios'),
    Quote = require('../models/QuoteSchema');

exports.getAllQuotes = async (req, res) => {
    try {
        const result = await axios.get('https://type.fit/api/quotes');
        return res
            .status(200)
            .json({
                msg: "Found Quotes",
                quotes: result.data
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                msg:" Something went wrong"
            })
    }
}

exports.postAddNewQuote = async (req, res) => {
    const { author, text, category } = req.body;
    try {
        const newQuote = await Quote.create({
            author: author || "Unknown",
            text: text,
            category
        });
        return res.status(201).json({ msg: 'Quote created', newQuote });
    } catch (err) {
        console.log(err);
    }

}

exports.getQuoteById = async (req, res) => {
    const { quoteId } = req.params;
    try {
        const quote = await Quote.findOne({ _id: quoteId });
        if (!quote) return res.status(404).json({ msg: 'Quote not found'});
        else return res.status(200).json({ msg: 'Found quote', quote});
    } catch (err) {
        console.log(err);
    }
}

exports.putUpdateQuoteById = async (req, res) => {
    const { quoteId } = req.params;
    const { author, text, category } = req.body;
    try {
        const updatedQuote = await Quote.findOneAndUpdate(
            { _id: quoteId },
            {author, text, category});
        return res.status(201).json({ msg: 'Quote updated', updatedQuote });
    } catch (err) {
        console.log(err)
    }
}

// exports.putUpdateQuoteById = async (req, res) => {
//     const { quoteId } = req.params;
//     const { author, text, category } = req.body;
//     try {
//         await Quote.findOne({ _id: quoteId }, async (err, quote) => {
//             if (!quote) return res.status(404).json({ msg: `A quote with that ID doesn't exist` });
//             else {
//                 quote.author = author || quote.author;
//                 quote.text = text || quote.text;
//                 quote.category = category || quote.category;
//                 await quote.save();
//                 return res.status(201).json({ msg: 'Quote updated', quote });
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

exports.deleteQuoteById = async (req, res) => {
    const { quoteId } = req.params;
    try {
        await Quote.findByIdAndDelete(quoteId);
        return res.status(200).json({ msg: 'Quote deleted' });
    } catch (err) {
        console.log(err);
    }
}