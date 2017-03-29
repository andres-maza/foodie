const YelpService = require('../../services/yelp.js');

let controller = {};

controller.index = (req, res) => {
  // console.log(req.query.lat, req.query.lng);
  YelpService
  .findOptions(req.params.lat, req.params.lng, req.query.term)
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
