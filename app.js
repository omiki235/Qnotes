const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 8000;

mongoose.connect('mongodb://127.0.0.1/nandemo_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
