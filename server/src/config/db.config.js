const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'passw0rd',
  database: process.env.DB_NAME || 'nortion_data',
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log('データベースに接続しました');
    connection.release();
  })
  .catch((err) => {
    console.error('データベースに接続できませんでした', err);
  });

module.exports = pool;
