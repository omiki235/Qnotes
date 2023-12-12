const { body, validationResult } = require('express-validator');
const dbConfig = require('../config/db.config');

function validateRegistration() {
  return [
    body('username')
      .isLength({ min: 5 })
      .withMessage('ユーザー名は5文字以上必要です。'),
    body('password')
      .isLength({ min: 7 })
      .withMessage('パスワードは7文字以上必要です。'),
    body('confirmPassword')
      .isLength({ min: 7 })
      .withMessage('確認用パスワードは7文字以上必要です。')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('確認用パスワードが一致しません。');
        }
        return true;
      }),
    body('username').custom((value) => {
      return new Promise((resolve, reject) => {
        dbConfig.query(
          'SELECT * FROM users WHERE username = ?',
          [value],
          (err, results) => {
            if (err) {
              reject(new Error('データベースエラー'));
            }
            if (results.length > 0) {
              reject(new Error('このユーザーはすでに使用されています。'));
            }
            resolve(true);
          }
        );
      });
    }),
  ];
}

function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // データベースに新しいユーザーを挿入
  const { username, password } = req.body;
  dbConfig.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('データベースエラー: ' + err.message);
        return res.status(500).send('Internal Server Error');
      }
      return res
        .status(201)
        .json({ message: 'ユーザーが正常に登録されました。' });
    }
  );
}

module.exports = {
  validateRegistration,
  registerUser,
};
