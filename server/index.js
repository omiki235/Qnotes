const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = 8000;

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
