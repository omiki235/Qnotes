const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const memosRoutes = require('./src/routes/memos');
const dbConfig = require('./src/config/db.config');
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/memos', memosRoutes);

app.listen(PORT, () => {
  console.log(`${PORT}番のサーバーが起動しました`);
});

dbConfig.connect((err) => {
  if (err) {
    console.error('データベースに接続できませんでした', err);
  } else {
    console.log('データベースに接続しました');
  }
});
