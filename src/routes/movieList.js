const router = require('express').Router();
const movieListController = require('../controllers/movieList.controller');
const baseResponse = require('../middleware/baseResponse');


router.get('', async function (req, res, next) {
    try {
        let data = await movieListController();
        res.locals.data = { status: true, data: data }
        //revert response to user
        next();
    } catch (error) {
        console.error(error);
    }
}, baseResponse);

module.exports = router;