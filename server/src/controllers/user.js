const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      // ユーザーの重複を確認
      const [existingUser] = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (existingUser.legth > 0) {
        return res
          .status(400)
          .json({ error: 'このユーザーは既に使用されています。' });
      }
      // ユーザーを生成
      await pool.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
      res.status(500).json({ message: 'ユーザーが正常に作成されました。' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
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

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
