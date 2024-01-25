const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const pool = require('./src/config/db.config');

// 環境変数を読み込む
require('dotenv').config();

// CORS設定の詳細
const corsOptions = {
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

// CORSミドルウェアを適用
app.use(cors(corsOptions));

// JSONボディパーサーを適用
app.use(express.json());

// APIのルートを設定
app.use('/api', require('./src/routes'));

// アップロードされたファイルを提供するためのルートを設定
app.use('/uploads', express.static('./src/uploads'));

// サーバーを起動
app.listen(PORT, () => {
  console.log(`${PORT}番のサーバーが起動しました`);
});

// データベース接続を確認
pool
  .getConnection()
  .then((connection) => {
    console.log('データベースに接続しました');
    connection.release();
  })
  .catch((err) => {
    console.error('データベースに接続できませんでした', err);
  });
