const JWT = require('jsonwebtoken');
const pool = require('../config/db.config');

// クライアントから渡されたJWTの検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

// JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (tokenDecoded) {
    try {
      // MySQLクエリを使用して、トークンと一致するユーザーを探してくる
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [
        tokenDecoded.id,
      ]);

      // ユーザーが存在するか確認
      if (rows.length === 1) {
        req.user = {
          id: rows[0].id,
          username: rows[0].username,
          // 必要に応じて他のユーザープロパティを追加
        };
        next();
      } else {
        return res.status(401).json('権限がありません');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json('Internal Server Error');
    }
  } else {
    res.status(401).json('権限がありません');
  }
};
