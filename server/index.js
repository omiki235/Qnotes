const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 8000;
const pool = require('./src/config/db.config');

require('dotenv').config();

const corsOptions = {
  cors: {
    origin: '*',
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', require('./src/routes'));
app.use('*', express.static(path.join(__dirname, 'build')));
app.listen(PORT, () => {
  console.log(`${PORT}番のサーバーが起動しました`);
});

app.use('/uploads', express.static('./src/uploads'));

pool
  .getConnection()
  .then((connection) => {
    console.log('データベースに接続しました');
    connection.release();
  })
  .catch((err) => {
    console.error('データベースに接続できませんでした', err);
  });
