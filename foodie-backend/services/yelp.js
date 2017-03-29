const yelp = require('yelp-fusion');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let YelpService = {};

YelpService.findOptions = (lat, lng, term, delivery) => {
  return new Promise((resolve, reject) => {
    yelp.accessToken(clientId, clientSecret)
    .then((response) => {
      const client = yelp.client(response.jsonBody.access_token);

      // If delivery exists, run transactionSearch, else just search.
      if (delivery) {
        client.transactionSearch('delivery', {
          term: `${term}`,
          location: `${lat}, ${lng}`,
          radius: 1000,
          open_now: true
        })
        .then((results) => {
          return resolve(results.jsonBody.businesses);
        })
        .catch((err) => {
          return reject(err);
        });
      } else {
        client.search({
          term: `${term}`,
          location: `${lat}, ${lng}`,
          radius: 500,
          open_now: true
        })
        .then((results) => {
          return resolve(results.jsonBody.businesses);
        })
        .catch((err) => {
          return reject(err);
        });
      }

    });
  });
}

module.exports = YelpService;
