const router = require('express').Router();

router.use('/memos', require('./memos'));

module.exports = router;
