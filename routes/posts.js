const router = require('express').Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json('err');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json('編集に成功しました。');
    } else {
      return res.status(403).json('編集できませんでした。');
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//画像お気に入り
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    const posts = await Post.find({ userId: user._id });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
