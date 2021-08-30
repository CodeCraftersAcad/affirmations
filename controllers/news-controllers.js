const articles = require('../utils/news-service'),
    pageInfo = require('../utils/constatns');


exports.getAllNews = async (req, res) => {
    try {
        const news = await articles();
        return res
            .status(200)
            .json({
                msg: pageInfo.articles.ARTICLES_FOUND,
                articles: news
            });
    } catch (err) {
        return res
            .status(500)
            .json({ msg: pageInfo.articles.ARTICLES_FOUND });
    }
}