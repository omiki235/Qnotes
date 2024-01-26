const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const pool = require('./src/config/db.config');

require('dotenv').config();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', require('./src/routes'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
app.use('/uploads', express.static('./src/uploads'));

app.listen(PORT, () => {
  console.log(`サーバーが${PORT}番ポートで起動しました。`);
});

pool
  .getConnection()
  .then((connection) => {
    console.log('データベースに接続しました。');
    connection.release();
  })
  .catch((err) => {
    console.error('データベースに接続できませんでした。', err);
  });
