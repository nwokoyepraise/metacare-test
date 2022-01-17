const router = require('express').Router();
const baseResponse = require('../middleware/baseResponse');


router.get('', async function (req, res, next) {
    try {
        res.locals.data = { status: true, data: { message: 'server active!' } }
        //revert response to user
        next();
    } catch (error) {
        console.error(error);
    }
}, baseResponse);

module.exports = router;