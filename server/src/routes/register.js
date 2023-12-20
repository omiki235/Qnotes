const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../config/db.config');

router.post(
  '/register',
  [
    body('username')
      .isLength({ min: 5 })
      .withMessage('ユーザー名は5文字以上必要です。'),
    body('password')
      .isLength({ min: 7 })
      .withMessage('パスワードは7文字以上必要です。'),
    body('confirmPassword')
      .isLength({ min: 7 })
      .withMessage('確認用パスワードは7文字以上必要です。'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('パスワードと確認用パスワードが一致しません。');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // ユーザー名が既に存在するか確認
    const usernameExists = await doesUsernameExist(username);
    if (usernameExists) {
      return res
        .status(400)
        .json({ error: 'このユーザー名はすでに使用されています。' });
    }

    const connection = await pool.getConnection();
    try {
      // パスワードをbcryptでハッシュ化
      const hashedPassword = await bcrypt.hash(password, 10);

      // トランザクションの開始
      await connection.beginTransaction();

      // ユーザーをデータベースに保存
      await connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );

      // トランザクションのコミット
      await connection.commit();

      res.status(200).json({ message: 'ユーザーが正常に登録されました。' });
    } catch (error) {
      // トランザクションのロールバック
      await connection.rollback();

      console.error('ユーザーの登録エラー:', error);
      res.status(500).json({ error: '内部サーバーエラー' });
    } finally {
      connection.release();
    }
  }
);

// ユーザー名が既に存在するか確認する関数
async function doesUsernameExist(username) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows.length > 0;
  } finally {
    connection.release();
  }
}

module.exports = router;
