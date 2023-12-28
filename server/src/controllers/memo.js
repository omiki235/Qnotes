const pool = require('../config/db.config');
require('dotenv').config();

exports.create = async (req, res) => {
  try {
    const userId = req.user.id || DEFAULT_USER_ID;

    const [rows] = await pool.query('SELECT COUNT(*) as count FROM memos');
    const memoCount = rows[0].count;

    const [result] = await pool.query(
      'INSERT INTO memos (user_id, position) VALUES (?, ?)',
      [userId, memoCount > 0 ? memoCount : 0]
    );

    const insertedMemo = {
      id: result.insertId,
      user_id: userId,
      position: memoCount > 0 ? memoCount : 0,
    };

    res.status(201).json(insertedMemo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const userId = req.user.id || DEFAULT_USER_ID;

    const [rows] = await pool.query(
      'SELECT * FROM memos WHERE user_id = ? ORDER BY position DESC',
      [userId]
    );

    const memos = rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      position: row.position,
      title: row.title,
      icon: row.icon,
    }));

    res.status(200).json(memos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user.id, memoId]
    );
    if (rows.length === 0) {
      return res.status(400).json('メモが見つかりません');
    }
    const memo = rows[0];
    if (memo.image_filename) {
      memo.imagePath = `uploads/${memo.image_filename}`;
    }
    res.status(200).json(memo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;

  try {
    const [memo] = await pool.query(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user.id, memoId]
    );

    if (!memo || memo.length === 0) {
      return res.status(404).json('メモが見つかりません');
    }

    if (memo.title === title && memo.description === description) {
      return res.status(200).json(memo);
    }

    await pool.query(
      'UPDATE memos SET title = ?, description = ? WHERE id = ?',
      [title, description, memoId]
    );

    const updatedMemo = {
      id: memoId,
      title,
      description,
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
    const [rows] = await pool.query(
      'SELECT * FROM memos WHERE user_id = ? AND id = ?',
      [req.user.id, memoId]
    );
    if (rows.length === 0) return res.status(404).json('メモが存在しません');
    await pool.query('DELETE FROM memos WHERE id = ?', [memoId]);
    res.status(200).json('メモを削除');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const memoId = req.params.memoId;
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
    const filename = file.filename;
    await pool.query('UPDATE memos SET image_filename = ? WHERE id = ?', [
      filename,
      memoId,
    ]);
    res.status(200).json({ message: 'Image uploaded successfully', filename });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
