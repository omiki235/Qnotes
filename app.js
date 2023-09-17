const express = require('express');
const app = express();
const postRouter = require('./routes/posts');
const mongoose = require('mongoose');

const port = 8000;
const path = require();

mongoose.connect(process.env.MONGOURL).then(() => {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`${port}ポートが立ち上がりました。`));
