const router = require('express').Router();
const memoController = require('../controllers/memo');
const tokenHandler = require('../handlers/tokenHandler');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    // ファイルタイプのチェック
    if (!file.mimetype.match(/image\/(jpeg|jpg|png|gif)$/)) {
      cb(new Error('Not an image!'), false);
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MBの制限
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
  tokenHandler.verifyToken,
  upload.single('image'),
  memoController.uploadImage
);

module.exports = router;
