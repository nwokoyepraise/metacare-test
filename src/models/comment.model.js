const pool = require('../config/postgres.config');

module.exports.addComment = async function (episode_id, comment, comment_id, user_ip) {
    return await (async () => {
        const client = await pool.connect();
        let comment_count, timestamp;
        try {
            //begin DB transaction
            await client.query('BEGIN');
            timestamp = (await client.query(`INSERT INTO movie_comments (episode_id, comment, comment_id, user_ip) VALUES ($1, $2, $3, $4) RETURNING timestamp`, [episode_id, comment, comment_id, user_ip])).rows[0].timestamp;
            comment_count = (await client.query('UPDATE movies SET comment_count = comment_count + 1 WHERE episode_id = $1 RETURNING comment_count', [episode_id])).rows[0].comment_count;

            //commit all changes
            await client.query('COMMIT');
        } catch (error) {
            //rollback changes if error occurs
            await client.query('ROLLBACK')
            throw error;
        }
        finally {
            //release client
            try { client.release(); } catch (error) { console.error(error) }
            return { status: true, comment_count: comment_count, timestamp: timestamp }
        }
    })().catch(error => {
        console.error(error.stack);
        return { status: false }
    });
}

module.exports.commentCount = async function (episode_id) {
    let comment_count;
    const client = await pool.connect();
    try {
        //get data from DB
        comment_count = (await client.query('SELECT comment_count FROM movies WHERE episode_id = $1', [episode_id])).rows[0].comment_count;
    } catch (error) {
        console.error(error.stack);
        return { status: false }
    } finally {
        //release client
        try { client.release(); } catch (error) { console.error(error) }
        return { status: true, comment_count: comment_count }
    }
}

module.exports.commentCounts = async function () {
    let comment_counts;
    const client = await pool.connect();
    try {
        //get data from DB
        comment_counts = (await client.query('SELECT episode_id, comment_count FROM movies ')).rows;
    } catch (error) {
        console.error(error.stack);
        return { status: false }
    } finally {
        //release client
        try { client.release(); } catch (error) { console.error(error) }
        return { status: true, comment_counts: comment_counts }
    }
}

module.exports.getComments = async function (episode_id) {
    let comments;
    const client = await pool.connect();
    try {
        //get data from DB
        comments = (await client.query('SELECT comment_id, comment, user_ip, timestamp FROM movie_comments WHERE episode_id = $1 ORDER BY timestamp DESC', [episode_id])).rows;
    } catch (error) {
        console.error(error.stack);
        return { status: false }
    } finally {
        //release client
        try { client.release(); } catch (error) { console.error(error) }
        return { status: true, comments: comments }
    }
}