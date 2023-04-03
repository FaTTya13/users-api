const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database: 'person_2d9d'
})


module.exports = pool