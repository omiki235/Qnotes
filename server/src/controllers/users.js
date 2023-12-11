const mysql = require('mysql2/promise');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
import dbConfig from '../config/db.config';

// DB接続
const pool = mysql.createPool(dbConfig);

// ユーザー新規登録
exports.register = async (req, res) => {
  // PWを受け取る
  const password = req.params.password;
  try {
    // PWの暗号化
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();

    // DBへ保存
    const [rows, fields] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [req.body.username, encryptedPassword]
    );

    const userId = rows.insertId;

    // トークンの発行
    const token = JWT.sign({ id: userId }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });
    return res.status(200).json({ userId, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json('Internal Server Error');
  }
};
