const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.DBUSERNAME,
    password: process.env.PWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todolist'
})

module.exports = pool