const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/memos', require('./memos'));

module.exports = router;
