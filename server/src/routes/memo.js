const router = require('express').Router();
const multer = require('multer');
const memoController = require('../controllers/memo');
const tokenHandler = require('../handlers/tokenHandler');

// ファイルのアップロードを処理するためのmulterモジュールの読み込み
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image file.'), false);
    }
  },

  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

// メモを作成
router.post('/', tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーのメモを全て取得
router.get('/', tokenHandler.verifyToken, memoController.getAll);

// ログインしているユーザーのメモを1つ取得
router.get('/:memoId', tokenHandler.verifyToken, memoController.getOne);

// ログインしているユーザーのメモを1つ更新
router.put('/:memoId', tokenHandler.verifyToken, memoController.update);

// ログインしているユーザーのメモを1つ削除
router.delete('/:memoId', tokenHandler.verifyToken, memoController.delete);

// 画像をアップロードしてメモに関連付けるエンドポイント
router.post(
  '/:memoId/upload-image',
  upload.single('image'),
  memoController.uploadImage
);

module.exports = router;
