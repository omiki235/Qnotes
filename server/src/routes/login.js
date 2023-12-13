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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await getUserFromDatabase(username);

      if (user && user.passwordHash) {
        // user.passwordHash が存在するか確認
        try {
          // パスワードの比較
          const passwordMatch = bcrypt.compareSync(password, user.passwordHash);

          if (passwordMatch) {
            // ログイン成功
            return res.status(200).json({ message: 'ログイン成功' });
          } else {
            // ログイン失敗
            return res
              .status(401)
              .json({ error: 'ログインできませんでした。' });
          }
        } catch (bcryptError) {
          console.error('bcryptエラー:', bcryptError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        // ユーザーまたはパスワードハッシュが見つからない場合
        return res
          .status(401)
          .json({ error: 'パスワードハッシュが見つかりませんでした。' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// データベースからユーザー情報を取得する関数
function getUserFromDatabase(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    dbConfig.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

module.exports = router;
