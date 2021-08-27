const NewsAPI = require('newsapi'),
    newsapi = new NewsAPI('3ca1264b13ab4860bc75b0c7228f3e24');

exports.getAllNews = async (req, res) => {
    try {
        const results = await newsapi.v2.everything({
            sources: 'abc-news, axios, fox-news, google-news, medical-news-today',
            q: 'kindness',
            language: 'en'
        });
        const articles = results.articles.filter(item => {
            return !item.title.toLowerCase().includes("police") &&
                !item.title.toLowerCase().includes("covid") &&
                !item.title.toLowerCase().includes("mask") &&
                !item.title.toLowerCase().includes("murder") &&
                !item.title.toLowerCase().includes("kill") &&
                !item.title.toLowerCase().includes("gun") &&
                !item.title.toLowerCase().includes("fire")
        });
        return res
            .status(200)
            .json({
                msg: "Found Articles",
                articles
            });
    } catch (err) {
        return res
            .status(500)
            .json({ msg: "Can't find articles" });
    }
}