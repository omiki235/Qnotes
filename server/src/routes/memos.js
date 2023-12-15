const router = require('express').Router();
const memosController = require('../controllers/memo');

router.post('/', memosController.create);

router.get('/:memoId', memosController.getOne);

module.exports = router;
