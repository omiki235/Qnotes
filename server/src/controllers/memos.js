const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

exports.create = async (req, res) => {
  try {
    // Connect to the MySQL database
    const connection = await mysql.createConnection(dbConfig);

    // Get the count of existing memos
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM memos'
    );
    const memoCount = rows[0].count;

    // Create a new memo
    const [result] = await connection.execute(
      'INSERT INTO memos (user_id, position) VALUES (?, ?)',
      [req.user._id, memoCount > 0 ? memoCount : 0]
    );

    // Close the database connection
    connection.end();

    // Respond with the created memo
    const createdMemo = {
      id: result.insertId,
      user_id: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    };
    res.status(201).json(createdMemo);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Database error' });
  }
};
