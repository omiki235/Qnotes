const express = require('express');
const cors = require('cors');
const app = express();
const registerRouter = require('./src/routes/register');
const loginRouter = require('./src/routes/login');

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api', require('./src/routes'));

app.use('/', registerRouter);
app.use('/', loginRouter);

app.listen(PORT, () => {
  console.log(`${PORT}番のサーバーが起動しました`);
});
