const pool = require('../config/db.config');

exports.create = async (req, res) => {
  try {
    // MySQLデータベースからメモの件数を取得
    const [rows] = await pool.query('SELECT COUNT(*) as memoCount FROM memos');
    const memoCount = rows[0].memoCount;

    // memo新規作成
    const [result] = await pool.query(
      'INSERT INTO memos (user_id, position) VALUES (?, ?)',
      [req.user.id, memoCount > 0 ? memoCount : 0]
    );

    // 新しく作成されたメモのIDを取得
    const insertedId = result.insertId;

    // 作成されたメモを取得
    const [memoResult] = await pool.query('SELECT * FROM memos WHERE id = ?', [
      insertedId,
    ]);
    const memo = memoResult[0];

    res.status(201).json(memo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM memos WHERE user_id = ? ORDER BY position DESC',
      [req.user._id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    // ユーザーのメモを取得
    const [rows] = await pool.execute(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user._id, memoId]
    );

    if (rows.length === 0) {
      return res.status(400).json('メモが見つかりません');
    }

    // メモが存在する場合、取得したメモをレスポンス
    const memo = rows[0];
    res.status(200).json(memo);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;

  try {
    if (title === '') req.body.title = '無題';
    if (description === '') req.body.description = '自由にご記入ください';

    const [memo] = await pool.execute(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user._id, memoId]
    );

    if (!memo || memo.length === 0) {
      return res.status(404).json('メモが見つかりません');
    }

    await pool.execute(
      'UPDATE memos SET title = ?, description = ? WHERE id = ?',
      [req.body.title, req.body.description, memoId]
    );
    const updatedMemo = {
      id: memoId,
      title: req.body.title,
      description: req.body.description,
    };

    res.status(200).json(updatedMemo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  const { memoId } = req.params;

  try {
    const [memo] = await pool.execute(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user._id, memoId]
    );

    if (!memo || memo.length === 0) {
      return res.status(404).json('メモが存在しません');
    }

    await pool.execute('DELETE FROM memos WHERE id = ?', [memoId]);
    res.status(200).json('メモを削除');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
