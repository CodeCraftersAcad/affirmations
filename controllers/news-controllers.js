const articles = require('../utils/news-service');

exports.getAllNews = async (req, res) => {
    try {
        const news = await articles();
        return res
            .status(200)
            .json({
                msg: "Found Articles",
                articles: news
            });
    } catch (err) {
        return res
            .status(500)
            .json({ msg: "Can't find articles" });
    }
}