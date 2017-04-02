const YelpService = require('../../services/yelp.js');
const WeatherService = require('../../services/weather.js');

let controller = {};

// Runs Yelp API search
controller.yelp = (req, res) => {
  YelpService
  .findOptions(req.params.lat, req.params.lng, req.query.term, parseInt(req.query.delivery, 10))
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res
    .status(400)
    .json({
      message: 'Woops! Looks like something went wrong!',
      error: err
    });
  });
}

controller.weather = (req, res) => {
  WeatherService
  .getWeather(req.params.lat, req.params.lng)
  .then(r => r.json())
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
