const fetchHelper = require('../utils/fetchHelper');

module.exports = async function (query) {
    try {
        let url = `https://swapi.py4e.com/api/people/`;
        let params = {};

        //fetch movie data
        let data = (await fetchHelper(url, params)).results;

        if (!query.sort) { return data }

        switch (query.sort) {
            case 'name':
                data.sort((a, b) => (a.name).localeCompare(b.name));
                break;

            case 'height':
                data.sort((a, b) => (a.height).localeCompare((b.height), undefined, { numeric: true }));
                break;

            case 'gender':
                data.sort((a, b) => (a.gender).localeCompare(b.gender));
                break;
        }

        if (!query.filter) { return data }

        data = data.filter(element => element.gender == query.filter);
        
        //return sorted movie data
        return data;

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}