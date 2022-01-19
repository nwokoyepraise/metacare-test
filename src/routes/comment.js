const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const baseResponse = require('../middleware/baseResponse');

router.post('/add', async function (req, res, next) {
    try {
        let body = req.body,
            comment = body.comment,
            user_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
            episode_id = body.episode_id;

        let data = await commentController.addComment(episode_id, comment, user_ip);
        res.locals.data = data;

        //revert response to user
        next();
    } catch (error) {
        console.error(error);
    }
}, baseResponse);

router.get('/:episode_id', async function (req, res, next) {
    try {
        let params = req.params,
            episode_id = params.episode_id;

        let data = await commentController.getComments(episode_id);
        res.locals.data = data;

        //revert response to user
        next();
    } catch (error) {
        console.error(error);
    }
}, baseResponse);

module.exports = router;