const pool = require('../config/postgres.config');

module.exports.addComment = async function (episode_id, comment, comment_id) {
    return await (async () => {
        const client = await pool.connect();
        let comment_count, timestamp;
        try {
            //begin DB transaction
            await client.query('BEGIN');
            timestamp = (await client.query(`INSERT INTO movie_comments (episode_id, comment, comment_id) VALUES ($1, $2, $3) RETURNING timestamp`, [episode_id, comment, comment_id])).rows[0].timestamp;
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
    try {
        const client = await pool.connect();
        let comment_count = (await client.query('SELECT comment_count FROM movies WHERE episode_id = $1', [episode_id])).rows[0].comment_count;
        return { status: true, comment_counts: comment_count }
    } catch (error) {
        console.error(error.stack);
        return { status: false }
    }
}

module.exports.commentCounts = async function () {
    try {
        const client = await pool.connect();
        let comment_counts = (await pool.query('SELECT episode_id, comment_count FROM movies ')).rows;
        return { status: true, comment_counts: comment_counts }
    } catch (error) {
        console.error(error.stack);
        return { status: false }
    }
}