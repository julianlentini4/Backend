const mysql = require('mysql2/promise')
const mySqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "sanatorio"
});

module.exports = mySqlPool;