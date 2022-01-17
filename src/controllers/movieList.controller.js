const fetchHelper = require('../utils/fetchHelper');

module.exports = async function () {
    try {
        let url = `https://swapi.py4e.com/api/films/`;
        let params = {};
        return await fetchHelper(url, params);
    } catch (error) {
        console.error(error);
    }
}