import mysql from 'mysql2/promise';
//Sql Connection
const mySqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "sanatorio"
});

export default mySqlPool;
