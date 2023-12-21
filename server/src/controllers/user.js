const pool = require('../config/db.config');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

exports.register = async (req, res) => {
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await pool.query(
      'INSERT INTO users (username,  password) VALUES (?, ?)',
      [req.body.username, hashedPassword]
    );

    const token = JWT.sign(
      { id: rows.insertId },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    return res.status(200).json({
      user: {
        id: rows.insertId,
        username: req.body.username,
      },
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res
      .status(500)
      .json({ error: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (user.length === 0) {
      return res.status(401).json({ error: 'ユーザーが存在しません' });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'パスワードが一致しません' });
    }

    user.password = undefined;

    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
