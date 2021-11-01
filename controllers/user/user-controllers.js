const Quote = require('../../models/QuoteSchema'),
    User = require('../../models/UserSchema');


exports.getQuotesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const quotes = await Quote.find({ creator: userId });
        return res.status(200).json({ msg: "Found User", quotes });

    } catch (err) {
        console.log(err);
    }
}