const router = require('express').Router();

router.use('/api', require('./controllers/api/index.js'));

module.exports = router;
