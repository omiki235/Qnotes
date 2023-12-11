const express = require('express');
const cors = require('cors');
const app = express();
const dbConfig = require('./src/config/db.config');
const auth = require('./src/routes/auth');

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api', require('./src/routes'));

// ユーザー新規登録
app.post('/register', auth.validateRegistration(), auth.registerUser);

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
