const fetchHelper = require('../utils/fetchHelper');

module.exports = async function () {
    try {
        let url = `https://swapi.py4e.com/api/films/`;
        let params = {};
        

        //fetch movie data
        let data = await fetchHelper(url, params);
        let movies = [];

        //sort and select only relevant data
        data.results.forEach(element => {
            movies.push({ title: element.title, episode_id: element.episode_id, opening_crawl: element.opening_crawl, release_date: element.release_date, url: element.url })
        });
        
        return {count: data.count, movies};
    } catch (error) {
        console.error(error);
    }
}