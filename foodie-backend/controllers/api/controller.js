const YelpService = require('../../services/yelp.js');

let controller = {};

// Runs Yelp API search
controller.index = (req, res) => {
  YelpService
  .findOptions(req.params.lat, req.params.lng, req.query.term, req.query.delivery)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res
    .status(400)
    .json(err);
  });
}

module.exports = controller;
