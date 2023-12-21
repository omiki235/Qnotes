const pool = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // Get the password from the request body
  const password = req.body.password;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to the database
    const [rows] = await pool.query(
      'INSERT INTO users (username,  password) VALUES (?, ?)',
      [req.body.username, hashedPassword]
    );

    // Generate a token
    const token = jwt.sign(
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
    // ユーザーの存在を確認
    const [user] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (user.length === 0) {
      return res.status(401).json({ error: 'ユーザーが存在しません' });
    }
    // パスワードの比較
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'パスワードが一致しません' });
    }

    user.password = undefined;
    // JWT生成
    const token = jwt.sign(
      { userId: user[0].id, username: user[0].username },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'ログインに成功しました' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
