const mysql2 = require('mysql2')
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'saiket_internship_db'
})

module.exports = pool