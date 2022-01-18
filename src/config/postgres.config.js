require('dotenv').config();
const { Pool} = require('pg');

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.PG_CONN,
  ssl: {
    rejectUnauthorized: false
  }
});