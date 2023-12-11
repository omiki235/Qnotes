const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'passw0rd',
  database: 'nortion_data',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

exports.create = async (req, res) => {
  try {
    // MySQLデータベースに接続
    const connection = await mysql.createConnection(dbConfig);

    // 既存のメモの数を取得
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM memos'
    );
    const memoCount = rows[0].count;

    // 新しいメモを作成
    const [result] = await connection.execute(
      'INSERT INTO memos (user_id, position) VALUES (?, ?)',
      [req.user._id, memoCount > 0 ? memoCount : 0]
    );

    // データベース接続を閉じます
    connection.end();

    // 作成したメモを返信
    const createdMemo = {
      id: result.insertId,
      user_id: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    };
    res.status(201).json(createdMemo);
  } catch (error) {
    // エラーを処理する
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user._id, memoId]
    );

    if (rows.length === 0) {
      return res.status(400).json('メモが見つかりません');
    }
    const memo = rows[0];
    res.status(200).json(memo);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
