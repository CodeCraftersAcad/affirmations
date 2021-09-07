const articles = require('../utils/news-service'),
    serverInfo = require('../utils/constants');


exports.getAllNews = async (req, res) => {
    try {
        const news = await articles();
        return res
            .status(200)
            .json({
                msg: serverInfo.articles.ARTICLES_FOUND,
                articles: news
            });
    } catch (err) {
        return res
            .status(500)
            .json({ msg: serverInfo.articles.ARTICLES_FOUND });
    }
}