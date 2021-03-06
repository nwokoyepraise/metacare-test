const commentModel = require('../models/comment.model');
const cryptGen = require('../utils/cryptGen');

module.exports.addComment = async function (episode_id, comment, user_ip) {
    try {
        if (comment.length > 500) {
            return { status: false, status_code: 400, message: 'comment length cannot exceed 500' }
        }
        //generate unique comment_id
        let comment_id = cryptGen.gen(5);

        //add comment to DB
        let data = await commentModel.addComment(episode_id, comment, comment_id, user_ip);

        //check and return if DB operation is not successful
        if (!data.status) {
            return { status: false, status_code: 500, message: 'unable to add comment at this time, please try again later' }
        }

        //return details if operation is successful
        return { status: true, data: { episode_id: episode_id, comment_id: comment_id, comment: comment, comment_count: data.comment_count, timestamp: data.timestamp } };
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}

module.exports.getComments = async function (episode_id) {
    try {
        //retrieve comments from DB
        let data = await commentModel.getComments(episode_id);
        let comment_count = await commentModel.commentCount(episode_id);

        //check and return if DB operation is not successful
        if (!data.status) {
            return { status: false, status_code: 500, message: 'unable to add comment at this time, please try again later' }
        }

        //return details if operation is successful
        return { status: true, data: {comment_count: comment_count.comment_count, comments: data.comments} };
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}