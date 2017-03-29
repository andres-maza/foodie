const router = require('express').Router();
const controller = require('./controller.js');

router.get('/yelp/:lat/:lng?', controller.yelp);
router.get('/weather/:lat/:lng', controller.weather);

module.exports = router;
