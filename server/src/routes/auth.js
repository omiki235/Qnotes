const router = require('express').Router();
const { body } = require('express-validator');
const { pool } = require('../config/db.config');
const tokenHandler = require('../handlers/tokenHandler');
const userController = require('../controllers/user');
const validation = require('../handlers/validation');

require('dotenv').config();

// ユーザー新規登録
router.post(
  '/register',
  body('username')
    .isLength({ min: 5 })
    .withMessage('ユーザー名は5文字以上必要です。'),
  body('password')
    .isLength({ min: 7 })
    .withMessage('パスワードは7文字以上必要です。'),
  body('confirmPassword')
    .isLength({ min: 7 })
    .withMessage('確認用パスワードは7文字以上必要です。'),
  body('username').custom(async (value) => {
    const [existingUser] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [value]
    );
    if (existingUser.length > 0) {
      return Promise.reject('このユーザーはすでに使用されています。');
    }
  }),
  validation.validate,
  userController.register
);

// ログイン用 API認証
router.post(
  '/login',
  body('username')
    .isLength({ min: 5 })
    .withMessage('ユーザー名は5文字以上必要です'),
  body('password')
    .isLength({ min: 7 })
    .withMessage('パスワードは7文字以上必要です'),
  validation.validate,
  userController.register
);

// JWT API認証
router.post('/verify-token', tokenHandler.verifyToken, (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
