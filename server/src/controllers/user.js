const pool = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    // ユーザーを生成
    const [rows] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    const userId = rows.insertId;
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
    res
      .status(200)
      .json(
        { message: 'ユーザーが正常に作成されました。' },
        { user: { id: userId, username }, token }
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    // JWT生成
    const token = jwt.sign(
      { userId: user[0].id, username: user[0].username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'ログインに成功しました' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
