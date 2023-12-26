const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const pool = require('./src/config/db.config');

require('dotenv').config();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

app.use('/api', require('./src/routes'));

app.listen(PORT, () => {
  console.log(`${PORT}番のサーバーが起動しました`);
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
