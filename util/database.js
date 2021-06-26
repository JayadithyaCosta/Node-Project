const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-project',
    password: 'root'
});


module.exports = pool.promise();