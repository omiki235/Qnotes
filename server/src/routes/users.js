const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/users', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(userQuery, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Error inserting data into database' });
    } else {
      console.log(result);
      res.status(200).json({ message: 'Value insrted' });
    }
  });
});

router.get('/users', (req, res) => {
  const userQuery = 'SELECT * FROM users';
  db.query(userQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
