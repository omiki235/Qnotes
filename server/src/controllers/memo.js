const connection = require('../config/db_memo_config');

exports.create = async (req, res) => {
  try {
    // 新しいメモの位置を指定するために、既存のメモの数を取得
    const [results] = await connection
      .promise()
      .query('SELECT COUNT(*) as memoCount FROM memos');
    const memoCount = results[0].memoCount;

    // 新しいメモをデータベースに挿入
    const [insertResult] = await connection
      .promise()
      .query('INSERT INTO memos (user, position) VALUES (?, ?)', [
        req.user._id, // ユーザーのIDを使用する（必要に応じて変更）
        memoCount, // 新しいメモの位置は memoCount に設定
      ]);

    const insertedMemoId = insertResult.insertId;

    // 挿入されたメモをデータベースから取得
    const [memoResult] = await connection
      .promise()
      .query('SELECT * FROM memos WHERE id = ?', [insertedMemoId]);
    const memo = memoResult[0];

    // クライアントに挿入されたメモを返す
    res.status(201).json(memo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    // ユーザーが認証されているか
    if (!req.user || !req.user._id) {
      return res.status(401).json('ユーザーが認証されていません');
    }
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
