const nodeFetch = require('node-fetch');
const APP_ID = process.env.APP_ID;

let WeatherService = {};

WeatherService.getWeather = (lat, lng) => {
  return nodeFetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=${APP_ID}`);
}

module.exports = WeatherService;
