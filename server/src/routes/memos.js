const router = require('express').Router();
const memosController = require('../controllers/memos');

router.post('/', memosController.create);

module.exports = router;
