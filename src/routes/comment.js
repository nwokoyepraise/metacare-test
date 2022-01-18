const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const baseResponse = require('../middleware/baseResponse');

router.post('/add', async function (req, res, next) {
    try {
        let body = req.body,
            comment = body.comment,
            episode_id = body.episode_id;

        let data = await commentController.addComment(episode_id, comment);
        res.locals.data = data;

        //revert response to user
        next();
    } catch (error) {
        console.error(error);
    }
}, baseResponse);

module.exports = router;