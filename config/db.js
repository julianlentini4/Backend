import mysql from 'mysql2/promise';
const mySqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "sanatorio"
});

export default mySqlPool;