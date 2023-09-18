const express = require('express');
const app = express();
const postRouter = require('./routes/posts');
const uploadRouter = require('./routes/upload');
const mongoose = require('mongoose');
const port = 8000;
const path = require('path');

//環境変数を読み込む
require('dotenv').config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log('DBと接続中.........');
  })
  .catch((err) => {
    console.log('エラーが発生しました。', err);
  });

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use('/api/posts', postRouter);
app.use('/api/upload', uploadRouter);

app.listen(port, () => console.log(`${port}ポートが立ち上がりました。`));
