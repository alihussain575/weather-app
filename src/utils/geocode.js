const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWxpaHVzc2FpbjIxIiwiYSI6ImNsMHV5bDZhcjAwb2Izb3FxZHZqaGtpemoifQ.H9n6eRUjvL44lB2DOpGj5g`;

  request({ url: url, json: true }, (error, response) => {
    const { body } = response;

    if (error) {
      callback('Unable to connect to service', undefined);
    }
    if (response.body.features.length === 0) {
      callback('Unable to find location. try another search', undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
