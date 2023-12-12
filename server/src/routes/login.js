const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const dbConfig = require('../config/db.config');
const bcrypt = require('bcrypt');

// ログイン用 API認証
router.post(
  '/login',
  [
    body('username')
      .isLength({ min: 5 })
      .withMessage('ユーザー名は5文字以上必要です'),
    body('password')
      .isLength({ min: 7 })
      .withMessage('パスワードは7文字以上必要です'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // MySQLデータベースにクエリを実行してユーザーを検証するロジックをここに追加します
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    dbConfig.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length > 0) {
        // ログイン成功
        return res.status(200).json({ message: 'ログイン成功' });
      } else {
        // ログイン失敗
        return res.status(401).json({ error: '認証失敗' });
      }
    });
  }
);

module.exports = router;
