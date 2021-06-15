const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "subreddits_tracked"
});


module.exports = pool;