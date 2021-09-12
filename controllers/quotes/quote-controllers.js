const Quote = require('../../models/QuoteSchema'),
    User = require('../../models/UserSchema'),
    serverInfo = require('../../utils/constants');

exports.getAllQuotes = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_GET) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST});
    if (!req.dbQuotes || req.dbQuotes.length === 0) return res.status(500).json({msg: serverInfo.quotes.QUOTE_NOT_FOUND})
    res.status(200).json(req.dbQuotes)
}

exports.postAddNewQuote = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_POST) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST});
    if (!req.user) return res.status(400).json({msg: serverInfo.user.MUST_LOGIN});

    const user = await User.findById(req.user._id)
    const {author, text, category} = req.body;

    try {
        const existingQuote = await Quote.find({"text": {$regex: text, $options: "ig"}});
        if (existingQuote.length === 0) {
            const newQuote = await Quote.create({
                creator: user._id,
                author: author || "Unknown",
                text: text,
                category,
                visibility: {
                    public: !!user.isAdmin,
                    private: !user.isAdmin
                }
            });
            return res.status(201).json({msg: serverInfo.quotes.QUOTE_CREATED, newQuote});
        } else {
            return res.status(500).json({msg: serverInfo.quotes.QUOTE_EXISTS, existingQuote});
        }
    } catch (err) {
        console.log(err);
    }

}

exports.getQuoteById = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_GET) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST});
    const {quoteId} = req.params;

    try {
        const quote = await Quote.findOne({_id: quoteId});
        if (!quote) return res.status(404).json({msg: serverInfo.quotes.QUOTE_NOT_FOUND});
        else return res.status(200).json({msg: serverInfo.quotes.QUOTES_FOUND, quote});
    } catch (err) {
        console.log(err);
    }
}

exports.putUpdateQuoteById = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_PUT) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST})
    let quote = res.quote

    try {
        const {author, text, category, visibility} = req.body;
        if (quote) {
            const updatedQuote = await Quote.findOneAndUpdate(
                {_id: quote},
                {author, text, category, visibility},
                {returnOriginal: false}
            );
            return res.status(201).json({msg: serverInfo.quotes.QUOTE_UPDATED, updatedQuote});
        } else if (!quote) return res.status(400).json({msg: serverInfo.quotes.QUOTE_NOT_FOUND})

    } catch (err) {
        console.log(err)
    }
}

exports.deleteQuoteById = async (req, res) => {
    if (req.method !== serverInfo.route.METHOD_DELETE) return res.status(400).json({msg: serverInfo.error.INVALID_REQUEST})
    let quote = res.quote
    try {
        await Quote.findByIdAndDelete(quote);
        return res.status(200).json({msg: serverInfo.quotes.QUOTE_DELETED});
    } catch (err) {
        console.log(err);
    }
}