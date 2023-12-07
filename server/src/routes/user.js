app.post('/user', (req, res) => {
  const username = req.body.username;

  const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
  db.query(query, [username], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Error inserting data into database' });
    } else {
      res.status(200).json({ message: 'Value insrted' });
    }
  });
});

app.get('/user', (req, res) => {
  const query = 'SELECT * FROM user';
  db.query(query, (req, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});
