const express = require('express');
const cors = require('cors');
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

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/memo', require('./src/routes/memo'));

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
