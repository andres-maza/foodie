const router = require('express').Router();
const controller = require('./controller.js');

router.get('/yelp/q?', controller.yelp);
router.get('/weather/:lat/:lng', controller.weather);

module.exports = router;
