const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'newdatabase'
})

connection.connect()
const sqlFn = function (sql, arr, cb) {
    connection.query(sql, arr, cb)
}

module.exports = sqlFn;