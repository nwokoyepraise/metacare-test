const fetchHelper = require('../utils/fetchHelper');
const commentModel = require('../models/comment.model');

module.exports = async function () {
    try {
        let url = `https://swapi.py4e.com/api/films/`;
        let params = {};


        //fetch movie data
        let data = await fetchHelper(url, params);
        let movies = [];
        let comment_counts = (await commentModel.commentCounts()).comment_counts;
     
        //sort and select only relevant data
        for (element of data.results) {
            let comment_count = comment_counts[comment_counts.findIndex(key => key.episode_id == element.episode_id)].comment_count;
            movies.push({ title: element.title, episode_id: element.episode_id, comment_count: comment_count, opening_crawl: element.opening_crawl, release_date: element.release_date, url: element.url });
        }

        //sort data in begining from earliest to newest
        movies.sort(function (a, b) {
            return new Date(a.release_date) - new Date(b.release_date);
        })
        //return sorted movie data
        return { count: data.count, movies };
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}