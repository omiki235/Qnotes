const mysql = require('mysql2');

const dbConfig = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'passw0rd',
  database: 'nortion_data',
  port: 3306,
});

module.exports = dbConfig;
