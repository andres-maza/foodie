const nodeFetch = require('node-fetch');

const APP_ID = process.env.GEOLOCATION_ID;

let GoogleLocation = {};

GoogleLocation.getCoords = () => {
  return nodeFetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${APP_ID}`, {
    method: 'POST'
  });
}

module.exports = GoogleLocation;
