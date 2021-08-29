const NewsAPI = require('newsapi'),
    newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const articles = async () => {
    const results = await newsapi.v2.everything({
            sources: 'abc-news, axios, fox-news, google-news, medical-news-today',
            q: 'kindness',
            language: 'en'
        });
    const articles = results.articles.filter(item => {
            return !item.title.toLowerCase().includes("police") &&
                !item.title.toLowerCase().includes("covid") &&
                !item.title.toLowerCase().includes("dead") &&
                !item.title.toLowerCase().includes("death") &&
                !item.title.toLowerCase().includes("gop") &&
                !item.title.toLowerCase().includes("dems") &&
                !item.title.toLowerCase().includes("democrat") &&
                !item.title.toLowerCase().includes("republican") &&
                !item.title.toLowerCase().includes("politic") &&
                !item.title.toLowerCase().includes("tornado") &&
                !item.title.toLowerCase().includes("hurricane") &&
                !item.title.toLowerCase().includes("thunder") &&
                !item.title.toLowerCase().includes("lightning") &&
                !item.title.toLowerCase().includes("drown") &&
                !item.title.toLowerCase().includes("flood") &&
                !item.title.toLowerCase().includes("storm") &&
                !item.title.toLowerCase().includes("mask") &&
                !item.title.toLowerCase().includes("murder") &&
                !item.title.toLowerCase().includes("kill") &&
                !item.title.toLowerCase().includes("gun") &&
                !item.title.toLowerCase().includes("die") &&
                !item.title.toLowerCase().includes("fire")
    });
    return articles;
}
module.exports = articles;