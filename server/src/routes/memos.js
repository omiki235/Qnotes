const router = require('express').Router();
const memosController = require('../controllers/memos');

router.post('/', memosController.create);

router.get('/:memoId', memosController.getOne);

module.exports = router;
