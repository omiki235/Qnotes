const pool = require('../config/db.config');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

require('dotenv').config();

// 新規登録
exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);

    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [
      username,
      hashedPassword,
    ]);

    const token = JWT.sign(
      { username: username },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    return res
      .status(200)
      .json({ message: '新規登録に成功しました', token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'データベースエラーが発生しました' });
  }
};

// ログイン
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    const user = result[0][0];
    if (!user)
      return res.status(404).send({ message: 'ユーザーを見つけられません' });

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch)
      return res.status(401).send({ message: 'パスワードが一致しません' });

    const token = JWT.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'ログインできませんでした。' });
  }
};
