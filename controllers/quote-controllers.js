const axios = require('axios');

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