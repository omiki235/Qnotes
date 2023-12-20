const jwt = require('jsonwebtoken');
const pool = require('../config/db.config');

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(bearer, process.env.SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  //デコード済みのトークンがあれば(=以前ログインor新規作成されたユーザーであれば)
  if (tokenDecoded) {
    //そのトークンと一致するユーザーを探してくる。
    const userId = tokenDecoded.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    const values = [userId];

    try {
      const results = await query(sql, values);
      const user = results[0];

      if (!user) {
        return res.status(401).json('権限がありません');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error fetching user from database:', error);
      res.status(500).json('Internal Server Error');
    }
  } else {
    res.status(401).json('権限がありませんでした');
  }
};
